import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      //clear alerts
    })
  }

  render() {
    return (
      <div>hello world</div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };