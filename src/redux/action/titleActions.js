import * as titleActionTypes from '../action/types/titleActionTypes';
import TitleService from '../../services/TitleService';

export function setTitles(payload) {
	return {
		type: titleActionTypes.GET_TITLES,
		payload
	};
}

export function setProgress(payload){
	return {
		type : titleActionTypes.TITLE_LOAD_PROGRESS,
		payload
	}
}

export function getTitles(p, cid) {
	return function(dispatch) {
		dispatch(setProgress(true));
		return TitleService.getTitles(p, cid)
			.then((response) => handleSuccessResponse(response))
			.then((response) => dispatch(setTitles(response)))
			.catch(handleFailedResponse)
			.finally(() => dispatch(setProgress(false)));
	};
}

function handleSuccessResponse(response) {
	response = response.data;
	return response.content;
}

function handleFailedResponse(er) {
	er = er.response.data;
	console.log(er);
}
