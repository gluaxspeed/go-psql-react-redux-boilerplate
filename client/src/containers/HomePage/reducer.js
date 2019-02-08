import { fromJS } from 'immutable';

import {
	LOAD_TODOS,
	CHANGE_TODO,
	NEW_TODO,
	EVENT_SUCCESS,
	EVENT_ERROR,
} from './constants';

export const initialState = fromJS({
	loading: false,
	error: false,
	todo: '',
});

export default function homeReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_TODO:
			return state.set('todo', action.todo.replace(/@/gi, ''));
	
		case LOAD_TODOS:
			return state
				.set('loading', true)
				.set('error', false);
	
		case EVENT_SUCCESS:
			return state
				.set('loading', false);
	
		case EVENT_ERROR:
			return state
				.set('error', action.error.message)
				.set('loading', false);

		case NEW_TODO:
			return state
				.set('loading', true)
				.set('error', false);
	
		default:
			return state;
	}
}