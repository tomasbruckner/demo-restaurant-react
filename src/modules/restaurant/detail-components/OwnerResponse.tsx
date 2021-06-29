import React, { PureComponent } from 'react';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Typography from 'modules/common/components/controls/Typography';
import Divider from 'modules/common/components/controls/Divider';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components/macro';
import SimpleDialog from 'modules/common/components/dialogs/SimpleDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'modules/common/components/controls/Button';
import AddOrEditReviewReplyDialog from '../owned-restaurants-components/AddOrEditReviewReplyDialog';
import { ReviewResponse } from 'services/reviewService';
import { reviewReplyDeleteAsync } from '../../../core/redux/ducks/ReviewDuck';
import { connect, ConnectedProps } from 'react-redux';

const StyledDivider = withStyles({
  root: {
    marginLeft: '16px',
    marginRight: '16px',
  },
})(Divider);

const StyledWrapper = styled.div`
  display: flex;
  margin: 16px;
`;

const connector = connect(null, {
  dispatchDeleteReviewReply: reviewReplyDeleteAsync,
});

type Props = {
  review: ReviewResponse;
  canEdit?: boolean;
};

export class OwnerResponse extends PureComponent<
  Props & ConnectedProps<typeof connector> & WithTranslation
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
      dispatchDeleteReviewReply,
      review: { ownerResponse },
    } = this.props;

    if (ownerResponse && ownerResponse.reviewReplyId) {
      await dispatchDeleteReviewReply(ownerResponse.reviewReplyId);
    }
    this.onToggleDelete();
  };

  render() {
    const {
      review: { ownerResponse, restaurantId },
      canEdit,
      t,
    } = this.props;
    const { isEditOpen, isDeleteOpen } = this.state;

    if (!ownerResponse) {
      return null;
    }

    const { text, reviewId, reviewReplyId } = ownerResponse;

    return (
      <StyledWrapper>
        <StyledDivider orientation="vertical" flexItem />
        <div>
          <Typography variant="body1">{t('component.owner-response.title')}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {text}
          </Typography>
          {canEdit ? (
            <span>
              <Button asIcon onClick={this.onToggleEdit}>
                <EditIcon />
              </Button>
              <Button asIcon onClick={this.onToggleDelete}>
                <DeleteIcon />
              </Button>
              <SimpleDialog
                onClose={this.onToggleDelete}
                onSubmit={this.onDelete}
                isOpen={isDeleteOpen}
                text={t('component.owner-response.delete-text')}
                title={t('component.owner-response.delete-title')}
              />
              <AddOrEditReviewReplyDialog
                restaurantId={restaurantId}
                isControlledOpen={isEditOpen}
                onToggle={this.onToggleEdit}
                hideButton
                defaultOwnerResponse={text}
                reviewReplyId={reviewReplyId}
                reviewId={reviewId}
              />
            </span>
          ) : null}
        </div>
      </StyledWrapper>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(OwnerResponse));
