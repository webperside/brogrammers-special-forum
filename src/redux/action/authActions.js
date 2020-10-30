import * as authActionTypes from '../action/types/authActionTypes';

export function loginSuccess(response) {
	console.log(response);
	return {
		type: authActionTypes.LOGIN_SUCCESS,
		payload: response
	};
}

export function logoutSuccess(response) {
	return {
		type: authActionTypes.LOGOUT_SUCCESS,
		payload: response
	};
}

export function login() {
	return function(dispatch) {
		let url = 'https://bsfapi.herokuapp.com/auth?isAuthenticated=true';
		return fetch(url).then((response) => response.json()).then((response) => dispatch(loginSuccess(response)));
	};
}

export function logout() {
	return function(dispatch) {
		let url = 'https://bsfapi.herokuapp.com/auth?isAuthenticated=false';
		return fetch(url).then((response) => response.json()).then((response) => dispatch(logoutSuccess(response)));
	};
}
