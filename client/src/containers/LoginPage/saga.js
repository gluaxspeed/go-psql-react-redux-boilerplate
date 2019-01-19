import { call, put, select, takeLatest } from 'redux-saga/effects';

import { LOAD_TODOS } from './constants';
import { todosLoaded, todosLoadingError} from './actions'
import { makeSelectTodo } from './selectors';
import request from 'utils/request';

export function* getTodos() {
	try {
		const todo = select(makeSelectTodo());
		const reqUrl = 'http://localhost:5000/api/v1/auth/login';
		const todos = yield call(request, reqUrl);
		yield put(todosLoaded(todos));
	} catch(error) {
		yield put(todosLoadingError(error));
	}
}

export default function* todoData() {
	yield takeLatest(LOAD_TODOS, getTodos);
}