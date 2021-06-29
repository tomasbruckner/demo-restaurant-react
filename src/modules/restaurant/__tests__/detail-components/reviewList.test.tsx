import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ReviewList } from 'modules/restaurant/detail-components/ReviewList';
import { fakeTranslationProps } from 'utils/testUtils';

describe('ReviewList', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <ReviewList
          reviews={{
            status: '',
            size: 0,
            data: [],
          }}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
