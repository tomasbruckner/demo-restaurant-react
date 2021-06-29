import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ReviewDetail } from 'modules/restaurant/detail-components/ReviewDetail';
import { fakeTranslationProps } from 'utils/testUtils';

describe('ReviewDetail', () => {
  it('basic example', () => {
    const tree = renderer
      .create(<ReviewDetail positive withRestaurantLink {...fakeTranslationProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
