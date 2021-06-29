import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Button from 'modules/common/components/controls/Button';

describe('Button', () => {
  it('basic example', () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
