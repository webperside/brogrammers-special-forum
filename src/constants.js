export const BASE = {
	API_URL: 'https://bsfapi.herokuapp.com/api/'
	// API_URL: 'http://localhost:8080/api/'
};

export const AUTH = {
	URL_LOGIN: BASE.API_URL + 'token',
	URL_LOGOUT: BASE.API_URL + 'logout',
	URL_REFRESH: BASE.API_URL + 'refresh-token',
	USER_ACCESS_TOKEN: 'USER_ACCESS_TOKEN',
	USER_REFRESH_TOKEN: 'USER_REFRESH_TOKEN'
};

export const USER = {
	URL_SIGN_UP: BASE.API_URL + 'sign-up'
};
