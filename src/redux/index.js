import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import userShortInfoReducer from './reducer/userShortInfoReducer';
import selectCategoryReducer from './reducer/selectCategoryReducer';
import titleReducer from './reducer/titleReducer';
import titleLoadProgressReducer from './reducer/titleLoadProgressReducer';


const rootReducer = combineReducers({
	authReducer,
	userShortInfoReducer,
	selectCategoryReducer,
	titleReducer,
	titleLoadProgressReducer
});

export default rootReducer;
