import React, { PureComponent } from 'react';
import { PagedDto } from 'types/commonTypes';
import { ReviewResponse } from 'services/reviewService';
import LastReviewItem from './LastReviewItem';

type Props = {
  reviews: PagedDto<ReviewResponse>;
};

export class LastReviewList extends PureComponent<Props> {
  render() {
    const { reviews } = this.props;

    return reviews.data.map(review => <LastReviewItem review={review} />);
  }
}

export default LastReviewList;
