import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectTodoListItem = (state) => state.get('todoListItem') || fromJS({});

const makeSelectTodo = () => createSelector(
  selectTodoListItem,
  (state) => state.get('todo')
);

const makeSelectLoading = () => createSelector(
  selectTodoListItem,
  (state) => state.get('loading')
);

const makeSelectError = () => createSelector(
  selectTodoListItem,
  (state) => state.get('error')
);

export {
  selectTodoListItem,
  makeSelectTodo,
  makeSelectLoading,
  makeSelectError,
};