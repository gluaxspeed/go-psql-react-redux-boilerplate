import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import asyncAwait from 'redux-async-await';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App.jsx';
import todoApp from './reducers/index.jsx';

const store = compose(applyMiddleware(thunk, asyncAwait))(createStore)(todoApp, composeWithDevTools());

render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
