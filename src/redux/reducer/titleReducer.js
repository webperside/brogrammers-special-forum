import * as titleActionTypes from '../action/types/titleActionTypes';
import {title} from '../config/initialState';

export default function titleReducer(state=title.titles,action){
    switch (action.type) {
        case titleActionTypes.GET_TITLES:
            return action.payload;
        default:
            return state;
    }
}