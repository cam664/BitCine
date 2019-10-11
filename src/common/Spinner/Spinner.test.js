import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders a snapshot', () => {
    const component = renderer.create(
      <Spinner />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});