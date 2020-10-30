import * as authActionTypes from '../action/types/authActionTypes';
import {auth} from '../config/initialState';

export default function authReducer(state=auth.isAuthenticated,action){
    switch (action.type) {
        case authActionTypes.LOGIN_SUCCESS: case authActionTypes.LOGOUT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}