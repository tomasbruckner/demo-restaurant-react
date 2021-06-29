import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Form from 'modules/common/components/controls/Form';

describe('Form', () => {
  it('basic example', () => {
    const tree = renderer.create(<Form />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
