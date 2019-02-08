import {
	CHANGE_USERNAME,
	CHANGE_PASSWORD,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	SIGNUP,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	CHANGE_SUSERNAME,
	CHANGE_SPASSWORD,
	CHANGE_SCONFIRM,
	CHANGE_SFIRST,
	CHANGE_SLAST,
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

export function login() {
	return {
		type: LOGIN,
	};
}

export function loginError(error) {
	return {
		type: LOGIN_ERROR,
		error
	};
}

export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS,
	};
}

export function changeRusername(username) {
	return {
		type: CHANGE_SUSERNAME,
		username
	};
}

export function changeRpassword(password) {
	return {
		type: CHANGE_SPASSWORD,
		password
	};
}

export function changeConfirm(confirm) {
	return {
		type: CHANGE_SCONFIRM,
		confirm
	};
}

export function changeFirst(first) {
	return {
		type: CHANGE_SFIRST,
		first
	};
}

export function changeLast(last) {
	return {
		type: CHANGE_SLAST,
		last
	};
}

export function register() {
	return {
		type: SIGNUP,
	};
}

export function registerError(error) {
	return {
		type: SIGNUP_ERROR,
		error
	};
}

export function registerSuccess() {
	return {
		type: SIGNUP_SUCCESS,
	};
}