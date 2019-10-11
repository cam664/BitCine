import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import { BrowserRouter as Router  } from 'react-router-dom';

describe('Header', () => {
  it('renders a snapshot', () => {
    const component = renderer.create(
      <Router>
        <Header />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});