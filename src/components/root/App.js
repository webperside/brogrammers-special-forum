import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import * as authActions from '../../redux/action/authActions';

const { default: Navi } = require('../navi/Navi');

class App extends Component {
	componentDidMount() {
		if (authActions.checkUserAuthenticated()) {
			this.props.actions.loginUser(true);
		}
	}

	render() {
		return (
			<Container>
				<Navi />
				{this.props.isAuthenticated ? <h3>You got it boi</h3> : <h3>Just click the fucking login button</h3>}
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
			loginUser: bindActionCreators(authActions.loginSuccess, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
