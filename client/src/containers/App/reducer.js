import { fromJS } from 'immutable';

import { SET_EMAIL } from './constants';

export const initialState = fromJS({
	userData: {
		email: false,
		todos: [],
	},
});

function appReducer(state = initialState, action) {
	switch(action.type) {
		case SET_EMAIL:
			return state
				.setIn(['userData', 'email'], action.email);

		default:
			return state;
	}
}

export default appReducer;