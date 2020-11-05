import * as authActionTypes from '../action/types/authActionTypes';
import { AUTH } from '../../constants';
import * as storageUtil from '../action/util/storageUtil';
import * as requestUtil from '../action/util/requestUtil';

// for state managment

export function loginSuccess(response) {
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

// process

export function login(tokenRequest) {
	return function(dispatch) {
		return fetch(AUTH.URL_LOGIN, {
			method: 'POST',
			headers: requestUtil.getHeaders(),
			body: JSON.stringify({
				username: tokenRequest.username,
				password: tokenRequest.password,
				rememberMe: tokenRequest.rememberMe
			})
		})
			.then(requestUtil.handleResponse)
			.then((response) => saveTokensToLocalStorage(response))
			.then(() => dispatch(loginSuccess(true)))
			.catch(requestUtil.handleError);
	};
}

export function logout() {
	return function(dispatch) {
		return fetch(AUTH.URL_LOGOUT, {
			method: 'GET',
			headers: requestUtil.getHeaders(true)
		})
			.then((response) => {
				if (response.ok) {
					removeTokensFromLocalStorage();
					dispatch(logoutSuccess(false));
					return;
				}

				let text = response.text();
				throw new Error(text);
			})
			.catch(requestUtil.handleError);
	};
}

export function checkUserAuthenticated() {
	return localStorage.getItem(AUTH.USER_ACCESS_TOKEN) !== null;
}

// private util methods

function saveTokensToLocalStorage(response) {
	storageUtil.saveItems({
		[AUTH.USER_ACCESS_TOKEN]: response.accessToken,
		[AUTH.USER_REFRESH_TOKEN]: response.refreshToken
	});
}

function removeTokensFromLocalStorage() {
	storageUtil.removeItems([ AUTH.USER_ACCESS_TOKEN, AUTH.USER_REFRESH_TOKEN ]);
}
