import { call, fork, put, select, takeLatest } from 'redux-saga/effects';

import { LOGIN, SIGNUP } from './constants';
import { loginSuccess, loginError } from './actions'
import {
	makeSelectUsername,
	makeSelectPassword,
	makeSelectRusername,
  makeSelectRpassword,
  makeSelectConfirm,
  makeSelectFirst,
  makeSelectLast,
} from './selectors';
import { post } from 'utils/request';

export function* login() {
	try {
		const email = yield select(makeSelectUsername());
		const password = yield select(makeSelectPassword());
		const reqUrl = 'auth/login';
		const user = yield call(
			post, 
			reqUrl, 
			{
				email,
				password,
			},
		);
		yield put(loginSuccess());
	} catch(error) {
		yield put(loginError(error));
	}
}

export function* signUp() {
	try {
		const email = yield select(makeSelectRusername());
	  const password = yield select(makeSelectRpassword());
	  const confirm = yield select(makeSelectConfirm());
	  const first = yield select(makeSelectFirst());
	  const last = yield select(makeSelectLast());

	  const user = yield call(
			post, 
			'auth/register', 
			{
				email,
				password,
				confirm,
				first,
				last,
			},
		);
		yield put(loginSuccess());
	} catch(error) {
		yield put(loginError(error));
	}
}

export default function* watcher() {
	yield [
		takeLatest(LOGIN, login),
		takeLatest(SIGNUP, signUp),
	];
}