import * as titleActionTypes from '../action/types/titleActionTypes';
import {title} from '../config/initialState';

export default function titleLoadProgressReducer(state=title.titlesLoadProgress,action){
    switch (action.type) {
        case titleActionTypes.TITLE_LOAD_PROGRESS:
            return action.payload;
        default:
            return state;
    }
}