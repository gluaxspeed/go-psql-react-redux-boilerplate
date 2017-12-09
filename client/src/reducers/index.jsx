import { combineReducers } from 'redux';
import todos from './todo.jsx';
import visibilityFilter from './visibilityFilter.jsx';

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;