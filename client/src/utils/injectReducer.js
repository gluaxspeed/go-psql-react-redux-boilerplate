import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux'

import getInjectors from './reducerInjectors';
import withStore from './withStore';

export default ({ key, reducer }) => (WrappedComponent) => {
  class ReduceInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    injectors = getInjectors(this.props.value);

    componentWillMount() {
      const { injectReducer } = this.injectors;
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(withStore(ReduceInjector), WrappedComponent);
};
