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

const makeSelectRusername = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('rusername')
);

const makeSelectRpassword = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('rpassword')
);

const makeSelectConfirm = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('confirm')
);

const makeSelectFirst = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('first')
);

const makeSelectLast = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('last')
);

export {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectError,
  makeSelectRusername,
  makeSelectRpassword,
  makeSelectConfirm,
  makeSelectFirst,
  makeSelectLast,
};