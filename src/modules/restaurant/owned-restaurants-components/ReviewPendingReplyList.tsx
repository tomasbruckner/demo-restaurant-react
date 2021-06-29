import React, { PureComponent } from 'react';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import ReviewPendingReply, { Props as PendingReplyProps } from './ReviewPendingReply';
import { PagedDto } from 'types/commonTypes';

export type Props = {
  reviewsPendingReply: PagedDto<PendingReplyProps>;
};

export class ReviewPendingReplyList extends PureComponent<Props & WithTranslation> {
  render() {
    const { reviewsPendingReply } = this.props;

    return reviewsPendingReply.data.map(o => <ReviewPendingReply key={o.reviewId} {...o} />);
  }
}

export default withTranslation(I18N_CORE)(ReviewPendingReplyList);
