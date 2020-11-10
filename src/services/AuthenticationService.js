import Axios from 'axios';
import { AUTH } from '../constants';
import { getHeaders } from '../redux/action/util/requestUtil';

class AuthenticationService {
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

	checkUserAuthenticated(){
		return localStorage.getItem(AUTH.USER_ACCESS_TOKEN) !== null;
	}

	login(tokenRequest) {
		return Axios.post(AUTH.URL_LOGIN, {
			username: tokenRequest.username,
			password: tokenRequest.password,
			rememberMe: tokenRequest.rememberMe
		});
	}

	refreshToken(){
		return Axios.post(AUTH.URL_REFRESH,{
			refreshToken: localStorage.getItem(AUTH.USER_REFRESH_TOKEN),
			rememberMe: true
		});
	}

	logout(){
		return Axios.get(AUTH.URL_LOGOUT, {
			headers:getHeaders()
		})
	}
}

export default new AuthenticationService();
