import React from 'react';
import 'jest-styled-components';
import { ReviewListItem } from 'modules/restaurant/detail-components/ReviewListItem';
import { fakeFunction, fakeReview, fakeTranslationProps, fakeUser } from 'utils/testUtils';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('ReviewListItem', () => {
  it('basic example', () => {
    const tree = shallowToJson(
      shallow(
        <ReviewListItem
          user={fakeUser}
          review={fakeReview}
          dispatchReviewDelete={fakeFunction}
          {...fakeTranslationProps}
        />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
