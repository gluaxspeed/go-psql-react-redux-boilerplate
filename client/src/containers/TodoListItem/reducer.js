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

export default function todoListReducer(state = initialState, action) {
	switch(action.type) {
		case DELETE_TODO:
			return state
				.set('loading', true)
				.set('error', false);

		case ERROR:
			return state
				.set('loading', false)
				.set('error', action.error.message);
		
		case SET_TODO:
			return state
				.set('todo', action.todo);

		case SUCCESS:
			return state
				.set('loading', true)
				.set('error', false);

		case UPDATE_TODO:
			return state
				.set('loading', true)
				.set('error', false);

		default:
			return state;
	}
}