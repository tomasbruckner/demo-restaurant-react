import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { LastReviewList } from 'modules/user-profile/components/LastReviewList';

describe('LastReviewList', () => {
  it('basic example', () => {
    const tree = renderer
      .create(<LastReviewList reviews={{ size: 0, status: '', data: [] }} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
