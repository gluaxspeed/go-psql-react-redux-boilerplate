import { SET_TODOS, SET_LOGGED_IN } from './constants';

export function setTodos(todos) {
	return {
		type: SET_TODOS,
		todos,
	};
}

export function setLoggedIn(status) {
	return {
		type: SET_LOGGED_IN,
		status, 
	};
}