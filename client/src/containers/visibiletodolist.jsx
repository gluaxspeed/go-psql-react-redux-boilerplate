import { connect } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../actions/index.jsx';
import TodoList from '../components/todolist.jsx';

function getVisibleTools(todos, filter) {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;

    case 'SHOW_COMPLETED':
      return todos.filter((todo) => {
        return todo.completed;
      });

    case 'SHOW_ACTIVE':
      return todos.filter((todo) => {
        return !todo.completed;
      });
  }
}

function mapStateToProps(state) {
  return {
    todos: getVisibleTools(state.todos, state.visibilityFilter)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    deleteTodo: (id) => {
      dispatch(deleteTodo(id));
    },
    updateTodo: (id) => {
      dispatch(updateTodo(id));
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;