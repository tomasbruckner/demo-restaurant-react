import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { AddOrEditReviewReplyDialog } from 'modules/restaurant/owned-restaurants-components/AddOrEditReviewReplyDialog';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';

describe('ReviewReplyDialog', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <AddOrEditReviewReplyDialog
          reviewId={1}
          restaurantId={2}
          dispatchGetPendingReviews={fakeFunction}
          dispatchCreateReply={fakeFunction}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
