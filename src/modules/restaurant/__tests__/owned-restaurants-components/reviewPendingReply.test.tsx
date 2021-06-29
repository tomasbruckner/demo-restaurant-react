import React from 'react';
import 'jest-styled-components';
import { ReviewPendingReply } from 'modules/restaurant/owned-restaurants-components/ReviewPendingReply';
import { fakeTranslationProps } from 'utils/testUtils';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('ReviewPendingReply', () => {
  it('basic example', () => {
    const tree = shallowToJson(
      shallow(
        <ReviewPendingReply
          restaurantId={1}
          ownerId={2}
          hasOwnerResponse
          reviewRatingId={3}
          reviewId={1}
          text="reviewReply"
          created=""
          ownerLastName="Lastname"
          ownerFirstName="Firstname"
          title="title"
          dateOfVisit=""
          restaurantName="Restaurant"
          ownerResponse="response"
          ownerImageLink="linkowner"
          {...fakeTranslationProps}
        />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
