import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import RatingWrapper from '../common-components/RatingWrapper';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import { formatDate } from 'utils/commonUtils';
import Divider from 'modules/common/components/controls/Divider';
import ReviewReplyDialog from './AddOrEditReviewReplyDialog';
import { ReviewResponse } from 'services/reviewService';

export type Props = ReviewResponse;

export class ReviewPendingReply extends PureComponent<Props & WithTranslation> {
  render() {
    const { reviewRatingId, restaurantId, title, text, created, reviewId, t } = this.props;

    return (
      <div style={{ display: 'flex', marginBottom: '32px' }}>
        <Divider
          orientation="vertical"
          flexItem
          style={{ marginLeft: '32px', marginRight: '32px' }}
        />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            {title}
          </Typography>
          <RatingWrapper
            averageRating={reviewRatingId}
            canEdit={false}
            text={t('component.review-pending-reply.review-date', {
              reviewDate: formatDate(created),
            })}
          />
          <Typography variant="body2" component="p">
            {text}
          </Typography>
          <ReviewReplyDialog restaurantId={restaurantId} reviewId={reviewId} />
        </div>
      </div>
    );
  }
}

export default withTranslation(I18N_CORE)(ReviewPendingReply);
