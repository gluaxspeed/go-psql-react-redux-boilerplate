import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectGlobal = (state) => state.get('global') || fromJS({});

const makeSelectUserTodos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'todos'])
);

const makeSelectLoggedIn = () => createSelector(
	selectGlobal,
	(globalState) => globalState.get('logged_in')
);

export {
	selectGlobal,
	makeSelectLoggedIn,
	makeSelectUserTodos,
}