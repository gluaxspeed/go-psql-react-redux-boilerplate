import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { cross, checkmark } from 'react-icons-kit/icomoon';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ListItem from 'components/ListItem';
import './style.scss';

export default class TodoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { item } = this.props;
    this.state = {
      todo: this.props.item,
    }

    this.clickCheck = this.clickCheck.bind(this);
    this.clickCross = this.clickCross.bind(this);
  }

  clickCheck() {
    const { todo } = this.state;
    this.props.onClickCheck(todo);
    this.setState({ todo: { completed: !todo.completed } });
  }

  clickCross() {
    const { todo } = this.state;
    this.props.onClickCross(todo);
  }

  render() {
    const { todo } = this.state;

    let content = (
      <div className="todo-list-item">
        {todo.todo}
      </div>
    );
    if (todo.completed) {
      content = (
        <div className="todo-list-item strike">
        {todo.todo}
        </div>
      );
    }

    return (
      <div className='todo-list-item-container'>
        <ListItem key={`todo-list-item-${todo.id}`} item={content} />
        <button onClick={this.clickCheck} className='left'><Icon icon={checkmark} /></button>
        <button onClick={this.clickCross} className='right'><Icon icon={cross} /></button>
      </div>
    );
  }
}

TodoListItem.propTypes = {
  item: PropTypes.object,
  onClickCheck: PropTypes.func,
  onClickCross: PropTypes.func,
};