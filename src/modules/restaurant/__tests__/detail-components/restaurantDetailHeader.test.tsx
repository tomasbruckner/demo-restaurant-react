import React from 'react';
import 'jest-styled-components';
import { RestaurantDetailHeader } from 'modules/restaurant/detail-components/RestaurantDetailHeader';
import {
  fakeFunction,
  fakeRestaurant,
  fakeRouterProps,
  fakeTranslationProps,
  fakeUser,
} from 'utils/testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('RestaurantDetailHeader', () => {
  it('basic example', () => {
    const tree = shallowToJson(
      shallow(
        <Router>
          <RestaurantDetailHeader
            restaurant={fakeRestaurant}
            dispatch={fakeFunction}
            user={fakeUser}
            {...fakeRouterProps}
            {...fakeTranslationProps}
          />
        </Router>,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
