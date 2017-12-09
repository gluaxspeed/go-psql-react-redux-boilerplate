import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './todo.jsx';

class TodoList extends Component {
  render() {
    const { todos, onTodoClick, deleteTodo, updateTodo } = this.props;
  
    return (
      <ul>
        {todos.map((todo) =>
         <Todo
          key={todo.id}
          todo={todo}
          onClick={() => onTodoClick(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
          updateTodo={() => updateTodo(todo)}
        />
        )}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default TodoList;