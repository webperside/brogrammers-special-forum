import { AUTH } from '../../../constants';

export function getHeaders() {
	return {
		Authorization: localStorage.getItem(AUTH.USER_ACCESS_TOKEN)
	};
}
