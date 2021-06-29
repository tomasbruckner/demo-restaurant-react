import React from 'react';
import 'jest-styled-components';
import { UserTable } from 'modules/user-management/components/UserTable';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('UserTable', () => {
  it('basic example', () => {
    const tree = shallowToJson(
      shallow(<UserTable fetchUsers={fakeFunction} userList={[]} {...fakeTranslationProps} />),
    );

    expect(tree).toMatchSnapshot();
  });
});
