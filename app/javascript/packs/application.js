import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { fetchProfiles } from './actions';
import rootReducer from './reducers';
import ProfileSearchCont from './containers/ProfileSearchCont';
import './bootstrap-reboot.css';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const loggerMiddleware = createLogger();
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);


store.dispatch(fetchProfiles());

const render = (App) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

const devAppWrapper = (App) => {
  document.addEventListener('DOMContentLoaded', () => {
    render(App);
  });
};

if (isDev) {
  devAppWrapper(ProfileSearchCont);
} else {
  render(ProfileSearchCont);
}
