import fetch from 'isomorphic-fetch';

import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function handleResponse(res) {
  if(!res.ok) {
    return Promise.reject(res.statusText);
  }

  return res.json();
}

async function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  const res = await fetch('/users/authenticate', requestOptions);
  if(!res.ok) {
    return Promise.reject(res.statusText);
  }

  const user = await res.json();
  if(user && user.token) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const res = await fetch('/users', requestOptions);

    return handleResponse(res);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const res = await fetch('/users/' + id, requestOptions);

    return handleResponse(res);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const res = await fetch('/users/register', requestOptions);

    return handleResponse(res);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const res = await fetch('/users/' + user.id, requestOptions);

    return handleResponse(res);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const res = await fetch('/users/' + id, requestOptions);

    return handleResponse(res);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}