import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Divider from 'modules/common/components/controls/Divider';

describe('Divider', () => {
  it('basic example', () => {
    const tree = renderer.create(<Divider />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
