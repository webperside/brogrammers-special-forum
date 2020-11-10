import Axios from 'axios';
import { USER } from '../constants';
import { getHeaders } from '../redux/action/util/requestUtil';

class UserService {
	constructor() {
		this.setupResponseInteceptors();
	}

	setupResponseInteceptors() {
		Axios.interceptors.response.use(
			function(response) {
				return response;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
	}

	getUserShortInfo() {
		return Axios.get(USER.URL_GET_SHORT_INFO, {
			headers: getHeaders()
		});
	}

	signUp(user){
		return Axios.post(USER.URL_SIGN_UP, {
			fullName: user.fullName.trim(),
			username: user.username.trim(),
			password: user.password.trim()
		})
	}
}

export default new UserService();
