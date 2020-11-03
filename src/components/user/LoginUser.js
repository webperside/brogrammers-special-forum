import React, { Component } from 'react';
import { FormGroup, Button, Form } from 'reactstrap';
import TextInput from '../toolbox/TextInput';
import CheckBox from '../toolbox/CheckBox';
import * as authActions from '../../redux/action/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LoginUser extends Component {
	state = {
		username: null,
		password: null,
		rememberMe: false
	};

	onChangeHandle = (event) => {
		const { name, value, checked } = event.target;

		let last = name === 'rememberMe' ? checked : value;

		this.setState({
			[name]: last
		});
	};

	onSubmitHandle = (event) => {
		event.preventDefault();
		this.props.actions.login(this.state).then(() => this.props.history.push('/profile'));
	};

	render() {
		return (
			<Form onSubmit={this.onSubmitHandle}>
				<FormGroup />
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
				<CheckBox name="rememberMe" onChange={this.onChangeHandle} defaultChecked={this.state.rememberMe} />
				<Button type="submit" onSubmit={this.onSubmitHandle}>
					Sign in
				</Button>
			</Form>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			login: bindActionCreators(authActions.login, dispatch)
		}
	};
}

export default connect(null, mapDispatchToProps)(LoginUser);
