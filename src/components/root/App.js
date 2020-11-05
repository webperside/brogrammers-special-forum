import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import * as authActions from '../../redux/action/authActions';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../common/AuthenticadetRoute';
import SignUpUser from '../user/SignUpUser';
import ProfileUser from '../user/ProfileUser';
import LoginUser from '../user/LoginUser';

const { default: Navi } = require('../navi/Navi');

class App extends Component {
	renderIfAuthenticated() {
		return (
			<div>
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

	componentDidMount() {
		if (authActions.checkUserAuthenticated()) {
			this.props.actions.setAuthenticate(true);
		} else {
			this.props.actions.setAuthenticate(false);
		}
	}

	render() {
		return (
			<Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
