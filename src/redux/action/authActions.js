import * as authActionTypes from '../action/types/authActionTypes';

// for state managment

export function setAuthentication(payload) {
	let type = payload ? authActionTypes.AUTHENTICATED : authActionTypes.NOT_AUTHENTICATED;
	return {
		type,
		payload
	};
}
