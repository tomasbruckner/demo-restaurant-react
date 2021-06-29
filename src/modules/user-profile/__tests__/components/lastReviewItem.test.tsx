import React from 'react';
import 'jest-styled-components';
import { LastReviewItem } from 'modules/user-profile/components/LastReviewItem';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { fakeReview } from '../../../../utils/testUtils';

describe('LastReviewItem', () => {
  it('basic example', () => {
    const tree = shallowToJson(shallow(<LastReviewItem review={fakeReview} />));

    expect(tree).toMatchSnapshot();
  });
});
