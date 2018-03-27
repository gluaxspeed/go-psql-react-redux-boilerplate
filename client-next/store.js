import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers here
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  null,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);