import { USER } from '../../constants';
import { handleError, handleResponse } from './util/requestUtil';

export function signUpUser(user) {
	return fetch(USER.URL_SIGN_UP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			fullName: user.fullName,
			username: user.username,
			password: user.password
		})
	})
		.then(handleResponse)
		.catch(handleError);
}
