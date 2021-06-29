import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Input from 'modules/common/components/controls/Input';

describe('Input', () => {
  it('basic example', () => {
    const tree = renderer.create(<Input />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
