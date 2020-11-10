import * as userActionTypes from '../action/types/userActionTypes';

// for state managment

export function getUserShortInfoSuccess(response) {
	return {
		type: userActionTypes.GET_USER_SHORT_INFO_SUCCESS,
		payload: response
	};
}