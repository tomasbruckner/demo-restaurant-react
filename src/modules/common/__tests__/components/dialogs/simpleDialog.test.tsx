import React from 'react';
import 'jest-styled-components';
import { SimpleDialog } from 'modules/common/components/dialogs/SimpleDialog';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

describe('SimpleDialog', () => {
  it('basic example', () => {
    const tree = EnzymeToJson(
      mount(
        <SimpleDialog
          text="text"
          isOpen
          cancelButtonText="cancel"
          title="title"
          submitButtonText="submit"
          onSubmit={fakeFunction}
          onClose={fakeFunction}
          {...fakeTranslationProps}
        />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
