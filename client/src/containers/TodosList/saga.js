import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { DELETE_TODO, UPDATE_TODO } from './constants';
import { loadingSuccess, loadingError} from './actions';
import { makeSelectTodo } from './selectors';
import { post } from 'utils/request';

export function* updateTodo() {
	try {
		const todo = yield select(makeSelectTodo());
		const resp = yield call(
			post,
			`todo/update/${todo.id}`,
			{
				completed: !todo.completed,
			},
		);
		yield put(loadingSuccess());
	} catch(error) {
		yield put(loadingError(error));
	}
}

export function* deleteTodo() {
	try {
		const todo = yield select(makeSelectTodo());
		const resp = yield call(
			post,
			`todo/delete/${todo.id}`,
		);
		yield put(loadingSuccess());
	} catch(error) {
		yield put(loadingError(error));
	}
}

export default function* watcher() {
	yield all([
		takeLatest(DELETE_TODO, deleteTodo),
		takeLatest(UPDATE_TODO, updateTodo),
	]);
}