import React, { Component } from 'react';
import TextInput from '../toolbox/TextInput';
import { Button, Form } from 'reactstrap';
import { REGEX, VALIDATION } from '../../constants';
import Progress from '../common/Progress';
import UserService from '../../services/UserService';

class SignUpUser extends Component {
	state = {
		fullName: null,
		username: null,
		password: null,
		error: {
			fullName: '',
			username: '',
			password: ''
		},
		progress: false
	};

	validateField = (name, value) => {
		let errorMessage = '';
		if (value === '') {
			errorMessage = VALIDATION.EMPTY_FIELD;
		} else if (name === 'fullName' && !REGEX.FULL_NAME.test(value)) {
			errorMessage = VALIDATION.WRONG_FULL_NAME;
		} else if (name !== 'fullName' && !REGEX.USERNAME_PASSWORD.test(value)) {
			errorMessage = VALIDATION.WRONG_USERNAME_PASSWORD;
		}
		return errorMessage;
	};

	checkNotEmpty = () => {
		let errors = {};

		errors = {
			username: this.validateField('username', this.state.username),
			fullName: this.validateField('fullName', this.state.fullName),
			password: this.validateField('password', this.state.password)
		};

		this.setState({ error: errors });
	};

	isValidated = () => {
		this.checkNotEmpty();
		let values = Object.values(this.state.error);
		return values.filter((item) => item === '').length === values.length;
	};

	onChangeHandle = (event) => {
		const { name, value } = event.target;

		let errorMessage = this.validateField(name, value);

		this.setState({
			[name]: value,
			error: {
				...this.state.error,
				[name]: errorMessage
			}
		});
	};

	handleSuccessResponse = (response) => {
		this.props.history.push('/login');
	};

	handleFailedResponse = (er) => {
		this.setState({ progress: false });
		er = er.response.data;
		this.setState({
			error: {
				username: er.message
			},
			progress: false
		});
		this.props.history.push('/sign-up');
	};

	onSubmitHandle = (event) => {
		event.preventDefault();
		if (this.isValidated()) {
			this.setState({ progress: true });
			UserService.signUp(this.state).then(this.handleSuccessResponse).catch(this.handleFailedResponse);
			return ;
		}
	};

	render() {
		return this.state.progress ? (
			<Progress />
		) : (
			<Form onSubmit={this.onSubmitHandle}>
				<TextInput
					name="fullName"
					label="Full name"
					placeHolder="Full name"
					value={this.state.fullName}
					onChange={this.onChangeHandle}
					error={this.state.error.fullName}
				/>
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
				<Button type="submit">Sign up</Button>
			</Form>
		);
	}
}

export default SignUpUser;
