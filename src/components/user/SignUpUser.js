import React, { Component } from 'react';
import TextInput from '../toolbox/TextInput';
import * as userActions from '../../redux/action/userActions';
import { Button } from 'reactstrap';

class SignUpUser extends Component {
	state = {
		fullName: null,
		username: null,
		password: null
	};

	onChangeHandle = (event) => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	postRequest = () => {
		userActions.signUpUser(this.state).then(() => {this.props.history.push('/login')});
	};

	render() {
		return (
			<form>
				<TextInput
					name="fullName"
					label="Full name"
					placeHolder="Full name"
					value={this.state.fullName}
					onChange={this.onChangeHandle}
					// error={errors.productName}
				/>
				<TextInput
					name="username"
					label="Username"
					placeHolder="Username"
					value={this.state.username}
					onChange={this.onChangeHandle}
					// error={errors.productName}
				/>
				<TextInput
					name="password"
					label="Password"
					placeHolder="Password"
					value={this.state.password}
					onChange={this.onChangeHandle}
					// error={errors.productName}
				/>
				<Button onClick={() => this.postRequest()}>Sign up</Button>
			</form>
		);
	}
}

export default SignUpUser;
