import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { UserProfileImage } from 'modules/user-profile/components/UserProfileImage';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';

describe('UserProfileImage', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <UserProfileImage
          dispatchGetMe={fakeFunction}
          imageLink="link"
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
