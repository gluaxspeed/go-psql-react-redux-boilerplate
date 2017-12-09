import fetch from 'isomorphic-fetch';

export const addTodo = async (text) => {
  const res = await fetch(`/api/v1/todos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: text
    })
  });

  const data = await res.json();

  return async (dispatch) => {
    await dispatch(sendTodo()),
    await dispatch(receiveTodo(data))
  };
};

export const sendTodo = () => {
  return {
    type: 'SEND_TODO'
  };
}

export const receiveTodo = (json) => {
  return {
    type: 'RECEIVE_TODO',
    todo: json
  };
}

export const deleteTodo = async (id) => {
  const res = await fetch(`/api/v1/todos/${id}`, {
    method: 'DELETE',
    id: id
  });

  return async (dispatch) => {
    await dispatch(sendTodo()),
    await dispatch(receiveDeleteTodo(id))
  };
}

export const receiveDeleteTodo = (id) => {
  return {
    type: 'RECEIVE_DELETE_TODO',
    id: id
  };
}

export const updateTodo = async (todo) => {
  const res = await fetch(`/api/v1/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });

  const data = await res.json();

  return async (dispatch) => {
    await dispatch(toggleTodo(todo)),
    await dispatch(receiveUpdateTodo(data))
  };
}

export const receiveUpdateTodo = (todo) => {
  return {
    type: 'RECEIVE_UPDATE_TODO',
    todo: todo
  };
}

export const clearTodo = () => {
  return {
    type: 'CLEAR_TODO'
  };
}

export const requestTodos = (json) => {
  return {
    type: 'REQUEST_TODOS'
  };
}

export const receiveTodos = (json) => {
  return {
    type: 'RECEIVE_TODOS',
    todos: json,
    updatedAt: Date.now()
  };
}

export const getTodos = async () => {
  const res = await fetch(`/api/v1/todos`);
  const data = await res.json();

  return async (dispatch) => {
    await dispatch(requestTodos()),
    await dispatch(receiveTodos(data))
  };
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
}

export const toggleTodo = (todo) => {
  return {
    type: 'TOGGLE_TODO',
    todo: todo
  };
}