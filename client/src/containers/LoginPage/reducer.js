import { fromJS } from 'immutable';

import {
	CHANGE_USERNAME,
	CHANGE_PASSWORD,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
} from './constants';

export const initialState = fromJS({
	loading: false,
	error: false,
	username: '',
	password: '',
});

function loginReducer(state = initialState, action) {
	switch(action.type) {
		case CHANGE_PASSWORD:
			return state.set('username', action.username.replace(/@/gi, ''));

		case CHANGE_USERNAME:
			return state.set('password', action.password.replace(/@/gi, ''));

		case LOGIN:
			return state
				.set('loading', true)
				.set('error', false);

		case LOGIN_SUCCESS:
			return state
				.set('loading', true)
				.setIn(['userData', 'email'], action.email);

		case LOGIN_ERROR:
			return state
				.set('loading', true)
				.set('error', action.error.message);

		default:
			return state;
	}
}