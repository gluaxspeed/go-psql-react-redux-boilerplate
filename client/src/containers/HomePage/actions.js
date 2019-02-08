import {
	CHANGE_TODO,
	LOAD_TODOS,
	EVENT_ERROR,
	EVENT_SUCCESS,
	NEW_TODO,
} from './constants';

export function changeTodo(todo) {
	return {
		type: CHANGE_TODO,
		todo
	};
}

export function loadTodos(email) {
	return {
		type: LOAD_TODOS,
		email
	};
}

export function loadingSuccess() {
	return {
		type: EVENT_SUCCESS,
	};
}

export function loadingError(error) {
	return {
		type: EVENT_ERROR,
		error
	};
}

export function newTodo() {
	return {
		type: NEW_TODO,
	};
}