import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import userShortInfoReducer from './reducer/userShortInfoReducer';

const rootReducer = combineReducers({
	authReducer,
	userShortInfoReducer
});

export default rootReducer;
