import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { UserIntro } from 'modules/user-profile/components/UserIntro';
import { fakeTranslationProps } from 'utils/testUtils';

describe('UserIntro', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <UserIntro
          user={{
            created: '',
            firstName: 'Test',
            lastName: 'Last',
            email: 'em@em',
            roleId: 1,
            imageLink: 'link',
            userId: 123,
          }}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
