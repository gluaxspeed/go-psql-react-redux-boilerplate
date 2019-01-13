import {
	CHANGE_TODO,
	LOAD_TODOS,
	LOAD_TODOS_ERROR,
	LOAD_TODOS_SUCCESS, 
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

export function todosLoaded(todos) {
	return {
		type: LOAD_TODOS_SUCCESS,
		todos,
	};
}

export function todosLoadingError(error) {
	return {
		type: LOAD_TODOS_ERROR,
		error
	};
}