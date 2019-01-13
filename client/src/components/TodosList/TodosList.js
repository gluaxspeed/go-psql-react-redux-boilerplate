import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import TodoListItem from 'containers/TodoListItem';

const TodosList = ({ loading, error, todos }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Failed to load. Please try again.'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (todos !== false) {
    return <List items={todos} component={TodoListItem} />;
  }

  return null;
};

TodosList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  todos: PropTypes.any
};

export default TodosList;