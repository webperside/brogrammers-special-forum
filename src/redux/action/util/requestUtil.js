import { AUTH } from '../../../constants';

export function getHeaders(authorization = false) {
	let headers = new Headers();

    headers.append('Content-Type', 'application/json');
	if (authorization) {
		let accessToken = localStorage.getItem(AUTH.USER_ACCESS_TOKEN);
		headers.append('Authorization', accessToken);
	}

	return headers;
}

export async function handleResponse(response) {
	if (response.ok) {
		return response.json();
	}

	let error = await response.text();
	throw new Error(error);
}

export async function handleError(error) {
	console.error(error);
	throw error;
}