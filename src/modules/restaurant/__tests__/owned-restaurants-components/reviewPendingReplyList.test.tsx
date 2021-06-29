import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ReviewPendingReplyList } from 'modules/restaurant/owned-restaurants-components/ReviewPendingReplyList';
import { fakeTranslationProps } from 'utils/testUtils';

describe('ReviewPendingReplyList', () => {
  it('basic example', () => {
    const tree = renderer
      .create(
        <ReviewPendingReplyList
          reviewsPendingReply={{ size: 0, status: '', data: [] }}
          {...fakeTranslationProps}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
