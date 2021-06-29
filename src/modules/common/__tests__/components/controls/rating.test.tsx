import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Rating from 'modules/common/components/controls/Rating';

describe('Rating', () => {
  it('basic example', () => {
    const tree = renderer.create(<Rating />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
