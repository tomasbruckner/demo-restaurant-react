import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { NotificationContent } from 'modules/common/components/notifications/NotificationContent';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';

describe('NotificationContent', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <NotificationContent
          message="text"
          variant="success"
          classes={{} as any}
          onClose={fakeFunction}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
