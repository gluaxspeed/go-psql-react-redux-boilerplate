import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectLogin = (state) => state.get('login') || fromJS({});

const makeSelectUsername = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('username')
);

const makeSelectPassword = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('password')
);

const makeSelectLoading = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('loading')
);

const makeSelectError = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('error')
);

export {
  selectLogin,
  makeSelectTodo,
  makeSelectLoading,
  makeSelectError,
};