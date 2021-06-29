import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { RestaurantList } from 'modules/restaurant/restaurants-components/RestaurantList';
import { fakeTranslationProps } from 'utils/testUtils';

describe('RestaurantList', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <RestaurantList
          restaurants={{ size: 0, status: '', data: [] }}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
