import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { Layout } from './common/Layout';
import createStore from './services/createStore';

const store = createStore(window.__REDUX_STORE__);

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Layout />
      </Router>
    </ReduxProvider>
  );
}

export default App;
