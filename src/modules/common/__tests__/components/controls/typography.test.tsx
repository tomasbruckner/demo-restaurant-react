import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Typography from 'modules/common/components/controls/Typography';

describe('Typography', () => {
  it('basic example', () => {
    const tree = renderer.create(<Typography />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
