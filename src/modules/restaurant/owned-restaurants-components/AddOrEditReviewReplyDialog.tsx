import React, { PureComponent } from 'react';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Button from 'modules/common/components/controls/Button';
import FormDialog from 'modules/common/components/dialogs/FormDialog';
import Input from 'modules/common/components/controls/Input';
import styled from 'styled-components/macro';
import { connect, ConnectedProps } from 'react-redux';
import { getPendingReviewsAsync, reviewFilterAsync } from 'core/redux/ducks/ReviewDuck';
import { reviewReplyCreateAsync, reviewReplyEditAsync } from 'core/redux/ducks/ReviewReplyDuck';
import { DEFAULT_PAGE_SIZE } from '../../../utils/constants';

const StyledButton = styled(Button)`
  margin: 32px;
`;

const connector = connect(null, {
  dispatchGetPendingReviews: getPendingReviewsAsync,
  dispatchGetReviews: reviewFilterAsync,
  dispatchCreateReply: reviewReplyCreateAsync,
  dispatchEditReply: reviewReplyEditAsync,
});

type Props = {
  restaurantId: number;
  reviewId: number;
  reviewReplyId?: number;
  defaultOwnerResponse?: string;
  hideButton?: boolean;
  isControlledOpen?: boolean;
  onToggle?: () => void;
};

export class AddOrEditReviewReplyDialog extends PureComponent<
  Props & ConnectedProps<typeof connector> & WithTranslation
> {
  state = {
    isOpen: false,
  };

  onOpenToggle = () => {
    const { isOpen } = this.state;
    const { onToggle } = this.props;

    if (onToggle) {
      onToggle();
    }

    this.setState({ isOpen: !isOpen });
  };

  onSubmit = async (data: any) => {
    const { text } = data.target.elements;
    const {
      dispatchGetPendingReviews,
      dispatchCreateReply,
      dispatchEditReply,
      dispatchGetReviews,
      reviewReplyId,
      restaurantId,
      reviewId,
    } = this.props;

    if (reviewReplyId) {
      await dispatchEditReply({
        data: {
          text: text.value,
        },
        reviewReplyId,
      });
      dispatchGetReviews({
        sort: {
          predicate: 'created',
          reverse: true,
        },
        skip: 0,
        take: DEFAULT_PAGE_SIZE,
        filter: {
          restaurantId,
        },
      });
    } else {
      await dispatchCreateReply({
        text: text.value,
        reviewId,
      });
      dispatchGetPendingReviews(restaurantId);
    }

    this.onOpenToggle();
  };

  render() {
    const { t, hideButton, defaultOwnerResponse, isControlledOpen } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        {hideButton ? null : (
          <StyledButton
            color="primary"
            variant="outlined"
            onClick={this.onOpenToggle}
            data-cy="review-reply-dialog-open"
          >
            {t('component.review-pending-reply-dialog.click-reply')}
          </StyledButton>
        )}
        <FormDialog
          title={t('component.review-pending-reply-dialog.title')}
          submitButtonText={t('component.review-pending-reply-dialog.submit')}
          cancelButtonText={t('component.review-pending-reply-dialog.cancel')}
          onClose={this.onOpenToggle}
          isOpen={isControlledOpen !== undefined ? isControlledOpen : isOpen}
          onSubmit={this.onSubmit}
        >
          <Input
            id="idReviewReplyDialogText"
            label={t('component.review-pending-reply-dialog.reply')}
            autoFocus
            required
            data-cy="review-reply-dialog-text"
            name="text"
            defaultValue={defaultOwnerResponse}
            rows={8}
            multiline
            fullWidth
          />
        </FormDialog>
      </>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(AddOrEditReviewReplyDialog));
