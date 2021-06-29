import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { RestaurantFilter } from 'modules/restaurant/restaurants-components/RestaurantFilter';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';

describe('RestaurantFilter', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <RestaurantFilter dispatchFilterRestaurants={fakeFunction} {...fakeTranslationProps} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
