import { call, put, select, takeLatest } from 'redux-saga/effects';

import { LOAD_TODOS } from './constants';
import { todosLoaded, todosLoadingError} from './actions'
import { makeSelectTodo } from './selectors';
import request from 'utils/request';

export function* getTodos() {
	try {
		const todo = select(makeSelectTodo());
		const reqUrl = '173.2.130.122:5555/api/v1/todo/get';
		const todos = yield call(request, reqUrl);
		// console.log('todos', todos);
		yield put(todosLoaded(['hi', 'fack', 'no']));
	} catch(error) {
		yield put(todosLoadingError(error));
	}
}

export default function* todoData() {
	yield takeLatest(LOAD_TODOS, getTodos);
}