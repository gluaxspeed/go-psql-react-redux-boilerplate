import { SET_EMAIL } from './constants';

export function setEmail(email) {
	return {
		type: SET_EMAIL,
		email,
	};
}