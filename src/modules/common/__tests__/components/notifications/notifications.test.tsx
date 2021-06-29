import React from 'react';
import 'jest-styled-components';
import { Notifications } from 'modules/common/components/notifications/Notifications';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

describe('Notifications', () => {
  it('basic example', () => {
    const tree = EnzymeToJson(
      mount(
        <Notifications
          removeNotificationAction={fakeFunction as ActionCreatorWithoutPayload}
          notification={{ message: 'notif', variant: 'success' }}
          {...fakeTranslationProps}
        />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
