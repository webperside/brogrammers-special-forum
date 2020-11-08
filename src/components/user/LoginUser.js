import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import TextInput from '../toolbox/TextInput';
import CheckBox from '../toolbox/CheckBox';
import Progress from '../common/Progress';
import * as authActions from '../../redux/action/authActions';
import * as userActions from '../../redux/action/userActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

	getUserShortInfoUtil = () => {
		userActions.getUserShortInfo()
		.then(response => {
			localStorage.setItem('user-detail', JSON.stringify(response));
		})
		.then(() => this.props.history.push('/profile'));
		
	}

	onSubmitHandle = (event) => {
		event.preventDefault();
		this.setState({ progress: true });
		this.props.actions
			.login(this.state)
			.then(() => this.getUserShortInfoUtil())
			.catch((er) => {
				this.setState({ progress: false });
				er = JSON.parse(er.message);
				let key = er.code === 104 ? 'username' : 'password';
				this.setState({
					error: {
						[key]: er.message
					}
				});
				this.props.history.push('/login');
			});
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
			login: bindActionCreators(authActions.login, dispatch)
		}
	};
}

export default connect(null, mapDispatchToProps)(LoginUser);
