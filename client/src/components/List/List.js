import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const List = (props) => {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  if (props.items) {
    content = props.items.map((item, index) => {
      item.index = index;
      return (<ComponentToRender key={`item-${item.id}`} item={item} />);
    });
  } else {
    content = (<ComponentToRender />);
  }

  return (
    <div className="list-wrapper">
      <ul>
        {content}
      </ul>
    </div>
  );
};

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
};

export default List;