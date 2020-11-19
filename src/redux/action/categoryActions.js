import * as categoryActionTypes from '../action/types/categoryActionTypes';

export function selectCategory(response) {
	return {
		type: categoryActionTypes.SELECT_CATEGORY,
		payload: response
	};
}