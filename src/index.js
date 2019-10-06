import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import createStore from './services/createStore';
import App from './App';

const store = createStore(window.__PRELOADED_STATE__);

const Application = (
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);

const root = document.querySelector('#root');

if (root.hasChildNodes() === true) {
  hydrate(Application, root);
} else {
  render(Application, root);
}