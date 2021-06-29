import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { UserProfileImage } from 'modules/restaurant/detail-components/UserProfileImage';
import { fakeTranslationProps } from 'utils/testUtils';

describe('UserProfileImage', () => {
  it('basic example', () => {
    const tree = renderer
      .create(<UserProfileImage imageLink="" {...fakeTranslationProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
