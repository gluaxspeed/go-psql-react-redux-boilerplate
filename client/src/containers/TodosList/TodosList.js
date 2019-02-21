import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import TodoListItem from 'components/TodoListItem';

const TodosList = ({ loading, error, todos, onClickCheck, onClickCross }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Failed to load. Please try again.'} />
    );
    return <List component={ErrorComponent} />;
  }

  const effects = {
    onClickCheck,
    onClickCross,
  };

  if (todos !== false) {
    return <List items={todos} component={TodoListItem} effects={effects}/>;
  }

  return null;
};

TodosList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  todos: PropTypes.any,
  onClickCheck: PropTypes.func,
  onClickCross: PropTypes.func,
};

export default TodosList;