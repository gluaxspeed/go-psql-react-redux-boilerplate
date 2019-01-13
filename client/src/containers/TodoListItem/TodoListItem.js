import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
//import { IssueIcon } from 'components/Icons';
import './style.scss';

export default class TodoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item } = this.props;

    const content = (
      <div className="todo-list-item">
        {item}
      </div>
    );

    return (
      <ListItem key={`todo-list-item-${item}`} item={content} />
    );
  }
}

TodoListItem.propTypes = {
  item: PropTypes.string,
};