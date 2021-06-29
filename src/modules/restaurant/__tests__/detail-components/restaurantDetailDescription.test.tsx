import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { RestaurantDetailDescription } from 'modules/restaurant/detail-components/RestaurantDetailDescription';
import { fakeFunction, fakeRestaurant, fakeTranslationProps, fakeUser } from 'utils/testUtils';

describe('RestaurantDetailDescription', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <RestaurantDetailDescription
          user={fakeUser}
          restaurant={fakeRestaurant}
          dispatchGetRestaurant={fakeFunction}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
