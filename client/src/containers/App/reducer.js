import { fromJS } from 'immutable';

import { SET_TODOS, SET_LOGGED_IN } from './constants';

export const initialState = fromJS({
	logged_in: false,
	userData: {
		todos: [],
	},
});

function appReducer(state = initialState, action) {
	switch(action.type) {
		case SET_TODOS:
			return state
				.setIn(['userData', 'todos'], action.todos);

		case SET_LOGGED_IN:
			return state
				.set('logged_in', action.status);

		default:
			return state;
	}
}

export default appReducer;