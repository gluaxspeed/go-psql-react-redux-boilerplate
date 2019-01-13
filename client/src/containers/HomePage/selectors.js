import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectHome = (state) => state.get('home') || fromJS({});

const makeSelectTodo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('todo')
);

const makeSelectLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('error')
);

const makeSelectTodos = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userData', 'todos'])
);

export {
  selectHome,
  makeSelectTodo,
  makeSelectLoading,
  makeSelectTodos,
  makeSelectError
};