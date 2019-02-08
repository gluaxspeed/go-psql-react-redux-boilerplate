import { fromJS } from 'immutable';

import {
	CHANGE_USERNAME,
	CHANGE_PASSWORD,
	CHANGE_SUSERNAME,
	CHANGE_SPASSWORD,
	CHANGE_SCONFIRM,
	CHANGE_SFIRST,
	CHANGE_SLAST,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	SIGNUP,
} from './constants';

export const initialState = fromJS({
	loading: false,
	error: false,
	username: '',
	password: '',
	rusername: '',
	rpassword: '',
	confirm: '',
	first: '',
	last: '',
});

export default function loginReducer(state = initialState, action) {
	switch(action.type) {
		case CHANGE_USERNAME:
			return state.set('username', action.username.replace(/$/gi, ''));

		case CHANGE_PASSWORD:
			return state.set('password', action.password.replace(/$/gi, ''));

		case CHANGE_SUSERNAME:
			return state.set('rusername', action.username.replace(/$/gi, ''));

		case CHANGE_SPASSWORD:
			return state.set('rpassword', action.password.replace(/$/gi, ''));

		case CHANGE_SCONFIRM:
			return state.set('confirm', action.confirm.replace(/$/gi, ''));

		case CHANGE_SFIRST:
			return state.set('first', action.first.replace(/$/gi, ''));

		case CHANGE_SLAST:
			return state.set('last', action.last.replace(/$/gi, ''));

		case LOGIN:
			return state
				.set('loading', true)
				.set('error', false);

		case LOGIN_SUCCESS:
			return state
				.set('loading', true);

		case LOGIN_ERROR:
			return state
				.set('loading', true)
				.set('error', action.error.message);

		case SIGNUP:
			return state
				.set('loading', true)
				.set('error', action.error.message);

		default:
			return state;
	}
}