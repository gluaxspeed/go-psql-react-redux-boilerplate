import { SET_TODOS } from './constants';

export function setTodos(todos) {
	return {
		type: SET_TODOS,
		todos,
	};
}