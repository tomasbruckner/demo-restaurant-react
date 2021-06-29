import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { OwnedRestaurantListItem } from 'modules/restaurant/owned-restaurants-components/OwnedRestaurantListItem';
import { fakeFunction, fakeRouterProps, fakeTranslationProps } from 'utils/testUtils';

describe('OwnedRestaurantListItem', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <OwnedRestaurantListItem
          ownerId={1}
          restaurantId={2}
          numberOfReviews={3}
          averageRating={4}
          imageLink="link"
          name="Name"
          description="description"
          address="address"
          contactPhone="123456789"
          websiteUrl="websiteurl"
          dispatchGetPendingReviews={fakeFunction}
          pendingReviews={{ size: 0, data: [], status: '' }}
          {...fakeRouterProps}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
