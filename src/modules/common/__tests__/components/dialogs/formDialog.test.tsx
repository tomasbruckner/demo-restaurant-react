import React from 'react';
import 'jest-styled-components';
import { FormDialog } from 'modules/common/components/dialogs/FormDialog';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

describe('FormDialog', () => {
  it('basic example', () => {
    const tree = EnzymeToJson(
      mount(
        <FormDialog
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
