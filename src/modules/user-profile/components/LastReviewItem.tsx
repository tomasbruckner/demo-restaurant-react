import React, { PureComponent } from 'react';
import { ReviewResponse } from 'services/reviewService';
import ReviewDetail from 'modules/restaurant/detail-components/ReviewDetail';
import styled from 'styled-components/macro';

type Props = {
  review: ReviewResponse;
};

const StyledWrapper = styled.div`
  margin: 16px;
`;

export class LastReviewItem extends PureComponent<Props> {
  render() {
    const { review } = this.props;

    return (
      <StyledWrapper>
        <ReviewDetail data={review} withRestaurantLink />
      </StyledWrapper>
    );
  }
}

export default LastReviewItem;
