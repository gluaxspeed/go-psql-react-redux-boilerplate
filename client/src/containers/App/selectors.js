import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectGlobal = (state) => state.get('global') || fromJS({});

const makeSelectUserTodos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'todos'])
);

const makeSelectUserToken = () => createSelector(
	selectGlobal,
	(globalState) => globalState.getIn(['userData', 'token'])
);

export {
	selectGlobal,
	makeSelectUserToken,
	makeSelectUserTodos,
}