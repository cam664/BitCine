import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import StarwarsCharacter from './StarwarsCharacter';
import { fetchPersonActions } from './StarwarsCharacterRedux';
import { default as StarwarsCharacterReducer } from './StarwarsCharacterRedux';

import createStore from '../../services/createStore';

const store = createStore(window.__PRELOADED_STATE__);

describe('StarwarsCharacter', () => {
  it('renders a snapshot', () => {
    const component = renderer.create(
      <ReduxProvider store={store}>
        <Router>
          <StarwarsCharacter />
        </Router>
      </ReduxProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('reducer', () => {
    const data = { name: 'John Smith' };

    it('should return a data object', () => {
      const state = { data: {}, status: 'loading' };
      const newState = StarwarsCharacterReducer(state, {
        type: fetchPersonActions.SUCCESS,
        data
      });
      expect(newState).toEqual({ data, status: 'success' });
    });

    it('should reset the error if data object is set', () => {
      const state = { data: {}, status: 'failure'};
      const newState = StarwarsCharacterReducer(state, {
        type: fetchPersonActions.SUCCESS,
        data
      });
      expect(newState).toEqual({ data, status: 'success' });
    });

    it('should set the error', () => {
      const state = { data, status: 'loading' };
      const newState = StarwarsCharacterReducer(state, {
        type: fetchPersonActions.FAILURE,
        data: {}
      });
      expect(newState).toEqual({ data: {}, status: 'failure' });
    });

  })
});