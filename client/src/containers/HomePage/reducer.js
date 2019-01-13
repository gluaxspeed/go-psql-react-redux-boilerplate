import { fromJS } from 'immutable';

import {
	CHANGE_TODO,
	LOAD_TODOS,
	LOAD_TODOS_ERROR,
	LOAD_TODOS_SUCCESS, 
} from './constants';

export const initialState = fromJS({
	loading: false,
	error: false,
	currentUser: false,
	userData: {
		todos: [],
	},
	todo: '',
});

function homeReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_TODO:
			return state.set('todo', action.todo.replace(/@/gi, ''));
	
		case LOAD_TODOS:
			return state
				.set('loading', true)
				.set('error', false)
				.setIn(['userData', 'todos'], action.todos);
	
		case LOAD_TODOS_SUCCESS:
			return state
				.set('loading', false)
				.setIn(['userData', 'todos'], action.todos);
	
		case LOAD_TODOS_ERROR:
			return state
				.set('error', action.error.message)
				.set('loading', false);
	
		default:
			return state;
	}
}

export default homeReducer;