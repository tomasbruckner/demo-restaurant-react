import React from 'react';
import 'jest-styled-components';
import { AddOrEditRestaurantDialog } from 'modules/restaurant/owned-restaurants-components/AddOrEditRestaurantDialog';
import { fakeFunction, fakeRouterProps, fakeTranslationProps } from 'utils/testUtils';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

describe('RestaurantAddDialog', () => {
  it('basic example', () => {
    const tree = EnzymeToJson(
      mount(
        <AddOrEditRestaurantDialog
          createRestaurant={fakeFunction}
          {...fakeTranslationProps}
          {...fakeRouterProps}
        />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
