import React from 'react';
import 'jest-styled-components';
import { FileUploadDialog } from 'modules/common/components/file-upload/FileUploadDialog';
import { fakeFunction, fakeTranslationProps } from 'utils/testUtils';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

describe('FileUploadDialog', () => {
  it('basic example', () => {
    const tree = EnzymeToJson(
      mount(
        <FileUploadDialog
          isOpen
          onSubmit={fakeFunction}
          onClose={fakeFunction}
          {...fakeTranslationProps}
        />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
