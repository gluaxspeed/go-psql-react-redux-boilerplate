import { fromJS } from 'immutable';

import { SET_TODOS } from './constants';

export const initialState = fromJS({
	userData: {
		todos: [],
	},
});

function appReducer(state = initialState, action) {
	switch(action.type) {
		case SET_TODOS:
			return state
				.setIn(['userData', 'todos'], action.todos);

		default:
			return state;
	}
}

export default appReducer;