import React, { PureComponent } from 'react';
import ReviewListItem from './ReviewListItem';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Typography from 'modules/common/components/controls/Typography';
import { withStyles } from '@material-ui/core';
import { PagedDto } from 'types/commonTypes';
import { ReviewResponse } from 'services/reviewService';

type Props = {
  reviews: PagedDto<ReviewResponse>;
};

const StyledTypography = withStyles({
  root: {
    margin: '16px',
  },
})(Typography);

export class ReviewList extends PureComponent<Props & WithTranslation> {
  render() {
    const { reviews, t } = this.props;

    if (reviews.size === 0) {
      return (
        <StyledTypography variant="h5">
          <i>{t('page.restaurant-detail.no-reviews')}</i>
        </StyledTypography>
      );
    }

    return reviews.data.map(o => <ReviewListItem key={o.reviewId} review={o} />);
  }
}

export default withTranslation(I18N_CORE)(ReviewList);
