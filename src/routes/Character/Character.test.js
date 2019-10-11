import React from 'react';
import renderer from 'react-test-renderer';

import Character from './Character';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import createStore from '../../services/createStore';

const store = createStore(window.__PRELOADED_STATE__);

describe('Character Route', () => {
  it('renders a snapshot', () => {
    const component = renderer.create(
      <ReduxProvider store={store}>
        <Router>
          <Character />
        </Router>
      </ReduxProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});