import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import TextInput from '../toolbox/TextInput';
import CheckBox from '../toolbox/CheckBox';
import Progress from '../common/Progress';
import * as authActions from '../../redux/action/authActions';
import * as userActions from '../../redux/action/userActions';
import * as storageUtil from '../../redux/action/util/storageUtil';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthenticationService from '../../services/AuthenticationService';
import UserService from '../../services/UserService';
import { AUTH } from '../../constants';

class LoginUser extends Component {
	state = {
		username: null,
		password: null,
		rememberMe: false,
		error: {
			username: '',
			password: ''
		},
		progress: false
	};

	onChangeHandle = (event) => {
		const { name, value, checked } = event.target;

		let last = name === 'rememberMe' ? checked : value;

		this.setState({
			[name]: last
		});
	};

	handleSuccessResponse = (response) => {
		response = response.data;
		storageUtil.saveItems({
			[AUTH.USER_ACCESS_TOKEN]: response.accessToken,
			[AUTH.USER_REFRESH_TOKEN]: response.refreshToken
		});

		UserService.getUserShortInfo().then((res) => {
			this.props.actions.setUserInfo(res.data);
			this.props.history.push('/');
			this.props.actions.setAuthentication(true);
		});
	};

	handleFailedResponse = (er) => {
		er = er.response.data;
		let key = er.code === 104 ? 'username' : 'password';
		this.setState({
			error: {
				[key]: er.message
			},
			progress: false
		});
		this.props.history.push('/login');
	};

	onSubmitHandle = (event) => {
		event.preventDefault();
		this.setState({
			...this.state,
			progress: true
		});

		AuthenticationService.login(this.state).then(this.handleSuccessResponse).catch(this.handleFailedResponse);
	};

	render() {
		return this.state.progress ? (
			<Progress />
		) : (
			<Form onSubmit={this.onSubmitHandle}>
				<TextInput
					name="username"
					label="Username"
					placeHolder="Username"
					value={this.state.username}
					onChange={this.onChangeHandle}
					error={this.state.error.username}
				/>
				<TextInput
					name="password"
					type="password"
					label="Password"
					placeHolder="Password"
					value={this.state.password}
					onChange={this.onChangeHandle}
					error={this.state.error.password}
				/>
				<CheckBox name="rememberMe" onChange={this.onChangeHandle} defaultChecked={this.state.rememberMe} />
				<Button type="submit">Sign in</Button>
			</Form>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			setAuthentication: bindActionCreators(authActions.setAuthentication, dispatch),
			setUserInfo: bindActionCreators(userActions.getUserShortInfoSuccess, dispatch)
		}
	};
}

export default connect(null, mapDispatchToProps)(LoginUser);
