import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { RestaurantDetailLink } from 'modules/restaurant/detail-components/RestaurantDetailLink';
import { fakeTranslationProps } from 'utils/testUtils';
import { BrowserRouter as Router } from 'react-router-dom';

describe('RestaurantDetailLink', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <Router>
          <RestaurantDetailLink
            restaurantId={1}
            restaurantName="restaurant"
            {...fakeTranslationProps}
          />
        </Router>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
