import * as categoryActionTypes from '../action/types/categoryActionTypes';
import {category} from '../config/initialState';

export default function authReducer(state=category.cid,action){
    switch (action.type) {
        case categoryActionTypes.SELECT_CATEGORY:
            return action.payload;
        default:
            return state;
    }
}