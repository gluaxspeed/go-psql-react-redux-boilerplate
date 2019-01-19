import {
	CHANGE_USERNAME,
	CHANGE_PASSWORD,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
} from './constants';

export function changeUsername(username) {
	return {
		type: CHANGE_USERNAME,
		username
	};
}

export function changePassword(password) {
	return {
		type: CHANGE_PASSWORD,
		password
	};
}

export function login(username, password) {
	return {
		type: LOGIN,
		username,
		password,
	};
}

export function loginError(error) {
	return {
		type: LOGIN_ERROR,
		error
	};
}

export function loginSuccess(email) {
	return {
		type: LOGIN_SUCCESS,
		email
	};
}