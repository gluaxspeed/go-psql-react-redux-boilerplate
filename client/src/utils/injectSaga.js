import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './sagaInjectors';
import withStore from './withStore';


export default ({ key, saga, mode }) => (WrappedComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
    injectors = getInjectors(this.props.value);

    componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(withStore(InjectSaga), WrappedComponent);
};
