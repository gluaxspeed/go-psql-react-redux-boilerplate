import React from 'react';
import { ReactReduxContext } from 'react-redux'

export default function withStore(Component) {
  return (props) => (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return <Component {...props} value={store} />
      }}
    </ReactReduxContext.Consumer>
  );
};