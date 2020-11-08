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
	URL_SIGN_UP: BASE.API_URL + 'sign-up',
	URL_GET_SHORT_INFO: BASE.API_URL + 'user-info'
};

export const REGEX = {
	FULL_NAME : /^([[\S][A-Za-z\u00C7\u00E7\u018F\u0259\u011E\u011F\u0049\u0131\u0130\u0069\u00D6\u00F6\u015E\u015F\u00DC\u00FC\s]*)$/,
	USERNAME_PASSWORD : /^[a-z0-9_]+$/i
}

export const VALIDATION = {
	EMPTY_FIELD : 'Məlumatları daxil edin',
	WRONG_FULL_NAME : 'Ad yalnız hərflərdən ibarət olmalıdır',
	WRONG_USERNAME_PASSWORD : 'Bu simvollardan istifadə mümkün deyil'
}
