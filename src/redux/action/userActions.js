import { USER } from '../../constants';
import { handleError, handleResponse } from './util/requestUtil';

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
