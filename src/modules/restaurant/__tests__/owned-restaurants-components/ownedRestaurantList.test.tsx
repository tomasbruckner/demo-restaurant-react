import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { OwnedRestaurantList } from 'modules/restaurant/owned-restaurants-components/OwnedRestaurantList';
import { fakeTranslationProps } from 'utils/testUtils';

describe('OwnedRestaurantList', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <OwnedRestaurantList
          restaurants={{ size: 0, status: '', data: [] }}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
