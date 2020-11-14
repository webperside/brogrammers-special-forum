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
import AuthenticationService from '../../services/AuthenticationService';
import UserService from '../../services/UserService';
import Toolbar from './Toolbar';
import TitleList from '../title/TitleList';

const { default: Navi } = require('../navi/Navi');

class App extends Component {
	state = {
		progress: true
	};

	renderIfAuthenticated() {
		return (
			<div>
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

	handleSuccessResponse = (response) => {
		response = response.data;
		storageUtil.saveItems({
			[AUTH.USER_ACCESS_TOKEN]: response.accessToken,
			[AUTH.USER_REFRESH_TOKEN]: response.refreshToken
		});
		UserService.getUserShortInfo().then((response) => {
			this.props.actions.setUserInfo(response.data);
			this.props.actions.setAuthentication(true);
			this.setState({ progress: false });
		});
	};

	handleFailedResponse = (er) => {
		this.setState({ progress: false });
		er = er.response.data;
		console.log(er);

		if (er.status === 403) {
			this.props.history.push('/login');
			this.props.actions.setAuthentication(false);
			storageUtil.removeItems([ AUTH.USER_ACCESS_TOKEN, AUTH.USER_REFRESH_TOKEN ]);
			return;
		}
	};

	componentDidMount() {
		if (AuthenticationService.checkUserAuthenticated()) {
			AuthenticationService.refreshToken().then(this.handleSuccessResponse).catch(this.handleFailedResponse);
		} else {
			this.props.actions.setAuthentication(false);
			this.setState({ progress: false });
		}
	}

	render() {
		return this.state.progress ? (
			<Progress />
		) : (
			<Container fluid={true}>
				<Navi />
				<Navigator />
				<Toolbar />
				<TitleList />
				{this.props.isAuthenticated ? this.renderIfAuthenticated() : this.renderIfNotAuthenticated()}
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer,
		userInfo: state.userShortInfoReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			setAuthentication: bindActionCreators(authActions.setAuthentication, dispatch),
			setUserInfo: bindActionCreators(userActions.getUserShortInfoSuccess, dispatch)
		}
	};
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
