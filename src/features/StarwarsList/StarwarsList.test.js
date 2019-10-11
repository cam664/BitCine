import React from 'react';
import renderer from 'react-test-renderer';

import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import StarwarsList from './StarwarsList';
import { default as StarwarsListReducer } from './StarwarsListRedux';
import { fetchListActions } from './StarwarsListRedux';

import createStore from '../../services/createStore';

const store = createStore(window.__PRELOADED_STATE__);

describe('StarwarsList', () => {
  it('renders a snapshot', () => {
    const component = renderer.create(
      <ReduxProvider store={store}>
        <Router>
          <StarwarsList />
        </Router>
      </ReduxProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('reducer', () => {
    const payload = { 
      status: 'success',
      data: [{name: 'John Smith'}, {name: 'Jane Doe'}],
      next: 'https://url.com',
      spliceIdx: 7
    };

    it('should return a data object with correct shape', () => {
      const state = { 
        list: {
          status: 'loading',
          data: [],
          next: null,
          spliceIdx: 7
        },
        ships: {
          status: 'loading',
          data: [],
          next: null
        }
      };
      const newState = StarwarsListReducer(state, {
        type: fetchListActions.SUCCESS,
        data: payload.data,
        next: payload.next,
        spliceIdx: payload.spliceIdx
      });
      expect(newState).toEqual({
        list: {
          data: payload.data,
          next: payload.next,
          spliceIdx: 7,
          status: 'success'
        },
        ships: {
          data: [],
          next: null,
          status: 'loading'
        }
      });
    });
  });
});