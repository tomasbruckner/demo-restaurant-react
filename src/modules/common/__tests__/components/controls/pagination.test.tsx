import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Pagination from 'modules/common/components/controls/Pagination';

describe('Pagination', () => {
  it('basic example', () => {
    const tree = renderer.create(<Pagination />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
