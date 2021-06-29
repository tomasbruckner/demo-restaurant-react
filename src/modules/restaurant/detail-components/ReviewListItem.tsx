import React, { PureComponent } from 'react';
import { Trans, withTranslation, WithTranslation } from 'react-i18next';
import { I18N_CORE } from 'core/i18n/i18n';
import { ReviewResponse } from 'services/reviewService';
import Typography from 'modules/common/components/controls/Typography';
import RatingWrapper from '../common-components/RatingWrapper';
import { Card, CardContent, withStyles } from '@material-ui/core';
import OwnerResponse from './OwnerResponse';
import { formatDate } from 'utils/commonUtils';
import UserProfileImage from './UserProfileImage';
import SimpleDialog from '../../common/components/dialogs/SimpleDialog';
import AddOrEditReviewDialog from './AddOrEditReviewDialog';
import { reviewDeleteAsync } from 'core/redux/ducks/ReviewDuck';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getUserFromState } from 'core/redux/ducks/UserDuck';
import { Role } from '../../../utils/constants';

const StyledTypography = withStyles({
  root: {
    marginBottom: '32px',
    marginRight: '16px',
    marginTop: '16px',
  },
})(Typography);

export type Props = {
  review: ReviewResponse;
};

const connector = connect(
  (state: RootState) => {
    return {
      user: getUserFromState(state),
    };
  },
  {
    dispatchReviewDelete: reviewDeleteAsync,
  },
);

const StyledCard = withStyles({
  root: {
    margin: '16px',
  },
})(Card);

export class ReviewListItem extends PureComponent<
  ConnectedProps<typeof connector> & Props & WithTranslation
> {
  state = {
    isDeleteOpen: false,
    isEditOpen: false,
  };

  onToggleDelete = () => {
    const { isDeleteOpen } = this.state;

    this.setState({ isDeleteOpen: !isDeleteOpen });
  };

  onToggleEdit = () => {
    const { isEditOpen } = this.state;

    this.setState({ isEditOpen: !isEditOpen });
  };

  onDelete = async () => {
    const {
      review: { reviewId, restaurantId },
      dispatchReviewDelete,
    } = this.props;

    await dispatchReviewDelete({ reviewId, restaurantId });
    this.onToggleDelete();
  };

  render() {
    const { review, user, t } = this.props;
    const { isEditOpen, isDeleteOpen } = this.state;
    const {
      owner: { firstName, lastName, imageLink },
      ownerResponse,
      dateOfVisit,
      title,
      text,
      restaurantId,
      created,
      reviewRatingId,
    } = review;

    return (
      <StyledCard variant="outlined">
        <CardContent style={{ display: 'flex' }}>
          <div>
            <StyledTypography variant="subtitle1">
              <strong>{`${firstName} ${lastName}`}</strong>
            </StyledTypography>
            <UserProfileImage imageLink={imageLink} />
          </div>
          <div>
            <RatingWrapper
              averageRating={reviewRatingId}
              text={t('component.review-list-item.reviewed-at', { date: formatDate(created) })}
              canEdit={
                user!.roleId === Role.Admin || (review && user!.userId === review.owner.userId)
              }
              onDelete={this.onToggleDelete}
              onEdit={this.onToggleEdit}
            />

            <SimpleDialog
              onClose={this.onToggleDelete}
              onSubmit={this.onDelete}
              isOpen={isDeleteOpen}
              text={t('component.review-list-item.delete-text')}
              title={t('component.review-list-item.delete-title')}
            />
            <AddOrEditReviewDialog
              hideButton
              onOpenToggle={this.onToggleEdit}
              isControlledOpen={isEditOpen}
              restaurantId={restaurantId}
              defaultRestaurantValues={review}
            />
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{text}</Typography>
            <Typography variant="subtitle1">
              {' '}
              <Trans
                i18nKey="component.review-list-item.date-of-visit"
                values={{ date: formatDate(dateOfVisit) }}
                components={{ strong: <strong /> }}
              />
            </Typography>
            <OwnerResponse
              review={review}
              canEdit={
                user!.roleId === Role.Admin ||
                (ownerResponse && user!.userId === ownerResponse.creatorId)
              }
            />
          </div>
        </CardContent>
      </StyledCard>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(ReviewListItem));
