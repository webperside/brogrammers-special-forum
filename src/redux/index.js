import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';

const rootReducer = combineReducers({
	authReducer
});

export default rootReducer;
