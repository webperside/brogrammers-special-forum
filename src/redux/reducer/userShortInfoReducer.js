import * as userActionTypes from '../action/types/userActionTypes';
import {user} from '../config/initialState';

export default function authReducer(state=user.userInfo,action){
    switch (action.type) {
        case userActionTypes.GET_USER_SHORT_INFO_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}