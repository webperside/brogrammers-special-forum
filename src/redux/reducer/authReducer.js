import * as authActionTypes from '../action/types/authActionTypes';
import {auth} from '../config/initialState';

export default function authReducer(state=auth.isAuthenticated,action){
    switch (action.type) {
        case authActionTypes.AUTHENTICATED: case authActionTypes.NOT_AUTHENTICATED:
            return action.payload;
        default:
            return state;
    }
}