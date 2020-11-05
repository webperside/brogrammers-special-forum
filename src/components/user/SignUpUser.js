import React, { Component } from 'react';
import TextInput from '../toolbox/TextInput';
import * as userActions from '../../redux/action/userActions';
import { Button } from 'reactstrap';

class SignUpUser extends Component {
	state = {
		fullName: null,
		username: null,
		password: null,
		error: {
			fullName: '',
			username: '',
			password: ''
		}
	};

	onChangeHandle = (event) => {
		const { name, value } = event.target;
		const regex = /^[a-z0-9_]+$/i;
		// const regexFullName = /[^\p{L}\d\s@#]/u;
		let errorMessage = '';

		// if(name === 'fullName' && !regexFullName.test(value)){
		// 	errorMessage = 'Ad yalnız hərflərdən ibarət olmalıdır'
		// } else
		if (!regex.test(value)) {
			errorMessage = 'Bu simvollardan istifadə mümkün deyil';
		}

		this.setState({
			[name]: value,
			error: {
				[name]: errorMessage
			}
		});
	};

	// validate = () => {
	// 	let regEx = '/^[a-z0-9]+$/i';
	// 	let errorFullName = '';
	// 	let errorUsername = '';
	// 	let errorPassword = '';
	// 	if(this.state.fullName === null || this.state.fullName.length < 6 || !regEx.test){
	// 		errorFullName = '6 sim'
	// 	}
	// }

	postRequest = () => {
		userActions
			.signUpUser(this.state)
			.then(() => {
				this.props.history.push('/login');
			})
			.catch((er) => {
				// er = JSON.parse(er.message);
				// this.setState({
				// 	error: {
				// 		[key]: er.message
				// 	}
				// });
				this.props.history.push('/sign-up');
			});
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
					label="Password"
					placeHolder="Password"
					value={this.state.password}
					onChange={this.onChangeHandle}
					error={this.state.error.password}
				/>
				<Button onClick={() => this.postRequest()}>Sign up</Button>
			</form>
		);
	}
}

export default SignUpUser;
