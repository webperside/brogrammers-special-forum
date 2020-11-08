import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import * as authActions from '../../redux/action/authActions';
import * as userActions from '../../redux/action/userActions';
import * as storageUtil from '../../redux/action/util/storageUtil';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthenticatedRoute from '../common/AuthenticadetRoute';
import SignUpUser from '../user/SignUpUser';
import ProfileUser from '../user/ProfileUser';
import LoginUser from '../user/LoginUser';
import Navigator from './Navigator';
import Progress from '../common/Progress';
import { AUTH } from '../../constants';

const { default: Navi } = require('../navi/Navi');

class App extends Component {
	state = {
		progress: true
	};

	renderIfAuthenticated() {
		return (
			<div>
				<Navigator />
				<h3>Nobody here, just you and me</h3>
				<Switch>
					<AuthenticatedRoute
						isAuthenticated={this.props.isAuthenticated}
						path="/profile"
						exact
						component={ProfileUser}
					/>
				</Switch>
			</div>
		);
	}

	renderIfNotAuthenticated() {
		return (
			<Switch>
				<Route exact path="/sign-up" component={SignUpUser} />
				<Route exact path="/login" component={LoginUser} />
			</Switch>
		);
	}

	getUserShortInfoUtil = () => {
		userActions.getUserShortInfo().then((response) => {
			localStorage.setItem('user-detail', JSON.stringify(response));
		});
	};

	componentDidMount() {
		if (authActions.checkUserAuthenticated()) {
			authActions
				.refreshToken()
				.then(() => {
					this.props.actions.setAuthenticate(true);
					this.getUserShortInfoUtil();
				})
				.catch((er) => {
					er = JSON.parse(er.message);
					if (er.status === 403) {
						this.props.history.push('/login');
						this.props.actions.setAuthenticate(false);
						storageUtil.removeItems([ AUTH.USER_ACCESS_TOKEN, AUTH.USER_REFRESH_TOKEN ]);
						return;
					}
				})
				.then(() => this.setState({ progress: false }));
		} else {
			this.props.actions.setAuthenticate(false);
			this.setState({ progress: false });
		}
	}

	render() {
		return this.state.progress ? (
			<Progress />
		) : (
			<Container fluid={true}>
				<Navi />
				{this.props.isAuthenticated ? this.renderIfAuthenticated() : this.renderIfNotAuthenticated()}
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			setAuthenticate: bindActionCreators(authActions.loginSuccess, dispatch)
		}
	};
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
