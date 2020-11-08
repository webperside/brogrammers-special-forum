import { USER } from '../../constants';
import { getHeaders, handleError, handleResponse } from './util/requestUtil';

export function signUpUser(user) {
	return fetch(USER.URL_SIGN_UP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			fullName: user.fullName.trim(),
			username: user.username.trim(),
			password: user.password.trim()
		})
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getUserShortInfo(){
	return fetch(USER.URL_GET_SHORT_INFO,{
		method: 'GET',
		headers: getHeaders(true)
	})
		.then(handleResponse)
		.catch(handleError)
}