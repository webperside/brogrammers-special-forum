import * as authActionTypes from '../action/types/authActionTypes';
import { AUTH } from '../../constants';
import * as storageUtil from '../action/util/storageUtil';

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

export function login(username, password, rememberMe) {
	return function(dispatch) {
		return fetch(AUTH.BASE_API_URL + 'token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
				rememberMe
			})
		})
			.then((response) => response.json())
			.then((response) => saveTokensToLocalStorage(response))
			.then(() => dispatch(loginSuccess(true)));
	};
}

export function checkUserAuthenticated() {
	let accessToken = localStorage.getItem(AUTH.USER_ACCESS_TOKEN);
	return accessToken !== null;
}

function saveTokensToLocalStorage(response) {
	storageUtil.saveItems({
		[AUTH.USER_ACCESS_TOKEN]: response.accessToken,
		[AUTH.USER_REFRESH_TOKEN]: response.refreshToken
	});
}

function removeTokensFromLocalStorage(){
	storageUtil.removeItems([ AUTH.USER_ACCESS_TOKEN, AUTH.USER_REFRESH_TOKEN ]);

}

export function logout() {
	return function(dispatch) {
		removeTokensFromLocalStorage();
		return dispatch(logoutSuccess(false));
	};
}
