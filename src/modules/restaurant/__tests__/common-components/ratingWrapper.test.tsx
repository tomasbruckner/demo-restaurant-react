import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { RatingWrapper } from 'modules/restaurant/common-components/RatingWrapper';
import { fakeTranslationProps } from 'utils/testUtils';

describe('Rating Wrapper', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <RatingWrapper
          text="test"
          averageRating={1}
          numberOfReviews={24}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
