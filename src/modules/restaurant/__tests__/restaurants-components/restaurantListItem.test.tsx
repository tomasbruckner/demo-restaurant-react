import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { RestaurantListItem } from 'modules/restaurant/restaurants-components/RestaurantListItem';
import { fakeRouterProps, fakeTranslationProps } from 'utils/testUtils';

describe('RestaurantListItem', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <RestaurantListItem
          restaurantId={1}
          ownerId={2}
          averageRating={3}
          numberOfReviews={6}
          imageLink="link"
          name="name"
          description="description"
          address="address"
          contactPhone="123456789"
          websiteUrl="website"
          {...fakeRouterProps}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
