import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { AddOrEditReviewDialog } from 'modules/restaurant/detail-components/AddOrEditReviewDialog';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';

describe('AddReviewDialog', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <AddOrEditReviewDialog
          restaurantId={1}
          dispatchCreateReview={fakeFunction}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
