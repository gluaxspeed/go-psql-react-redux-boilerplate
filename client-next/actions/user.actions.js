import { userConstants } from '../constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

async function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    try {
      const user = await userService.login(username, password);
      dispatch(success(user));
      history.push('/');
    } catch(err) {
      dispatch(failure(err));
      dispatch(alertActions.error(err));
    }

  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } };
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } };
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

async function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    try {
      const user = await userService.register(user);
      dispatch(success(user));
      history.push('/login');
      dispatch(alertActions.success('Registration successful'));
    } catch(err) {
      dispatch(failure(err));
      dispatch(alertActions.error(err));
    }

  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } };
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } };
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } };
}

async function getAll() {
  return (dispatch) => {
    dispatch(request);

    try{
      const users = await userService.getAll();
      dispatch(success(users));
    } catch(err) {
      dispatch(failure(err));
    }
  };

  function request() { return { type: userConstants.GETALL_REQUEST } };
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } };
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } };
}

async function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    try {
      const res = await userService._delete(id);
      dispatch(success(id));
    } catch(err) {
      dispatch(failure(id, err));
    }
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } };
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } };
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } };
}