import { fromJS } from 'immutable';

import {
	DELETE_TODO,
	ERROR,
	SET_TODO,
	SUCCESS,
	UPDATE_TODO,
} from './constants';

export const initialState = fromJS({
	loading: false,
	error: false,
	todo: {},
});

export default function todosListReducer(state = initialState, action) {
	switch(action.type) {
		case DELETE_TODO:
			return state
				.set('error', false);

		case ERROR:
			return state
				.set('error', action.error.message);
		
		case SET_TODO:
			console.log('set todo', action.todo);
			return state
				.set('todo', action.todo);

		case SUCCESS:
			return state
				.set('error', false);

		case UPDATE_TODO:
			return state
				.set('error', false);

		default:
			return state;
	}
}