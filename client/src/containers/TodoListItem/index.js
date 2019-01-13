import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


// import { makeSelectCurrentUser } from 'containers/App/selectors';
import TodoListItem from './TodoListItem';

export default connect(
  
)(TodoListItem);