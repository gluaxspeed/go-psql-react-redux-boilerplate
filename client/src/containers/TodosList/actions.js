import {
	DELETE_TODO,
	ERROR,
	SET_TODO,
	SUCCESS,
	UPDATE_TODO,
} from './constants';

export function deleteTodo() {
	return {
		type: DELETE_TODO,
	};
}

export function loadingError(error) {
	return {
		type: ERROR,
		error,
	};
}

export function setTodo(todo) {
	return {
		type: SET_TODO,
		todo
	};
}

export function loadingSuccess() {
	return {
		type: SUCCESS,
	};
}

export function updateTodo() {
	return {
		type: UPDATE_TODO,
	};
}