import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { OwnerResponse } from 'modules/restaurant/detail-components/OwnerResponse';
import { fakeFunction, fakeReview, fakeTranslationProps } from 'utils/testUtils';

describe('OwnerResponse', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <OwnerResponse
          review={fakeReview}
          {...fakeTranslationProps}
          dispatchDeleteReviewReply={fakeFunction}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
