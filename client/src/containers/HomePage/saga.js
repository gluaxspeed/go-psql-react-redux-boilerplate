import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { LOAD_TODOS, NEW_TODO } from './constants';
import { loadingSuccess, loadingError} from './actions';
import { setTodos } from 'containers/App/actions';
import { makeSelectTodo } from './selectors';
import { get, post } from 'utils/request';
 
export function* getTodos() {
	try {
		const resp = yield call(
			get,
			'todo/get',
		);
		const { todos } = resp.data; 
		yield put(setTodos(todos));
		yield put(loadingSuccess());
	} catch(error) {
		yield put(loadingError(error));
	}
}

export function* createTodo() {
	try {
		const todo = yield select(makeSelectTodo());
		const resp = yield call(
			post,
			'todo/new',
			{
				todo,
			}
		);
		yield put(loadingSuccess());
	} catch(error) {
		yield put(loadingError(error));
	}
}

export default function* watcher() {
	yield all([
		takeLatest(LOAD_TODOS, getTodos),
		takeLatest(NEW_TODO, createTodo)
	]);
}