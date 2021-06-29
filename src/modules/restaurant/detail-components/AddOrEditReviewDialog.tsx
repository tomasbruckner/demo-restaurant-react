import React, { PureComponent } from 'react';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Button from 'modules/common/components/controls/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import FormDialog from 'modules/common/components/dialogs/FormDialog';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Rating from 'modules/common/components/controls/Rating';
import Input from 'modules/common/components/controls/Input';
import styled from 'styled-components/macro';
import { withStyles } from '@material-ui/core';
import { reviewCreateAsync, reviewEditAsync } from 'core/redux/ducks/ReviewDuck';
import { connect, ConnectedProps } from 'react-redux';
import { ReviewResponse } from 'services/reviewService';

type Props = {
  restaurantId: number;
  defaultRestaurantValues?: ReviewResponse;
  hideButton?: boolean;
  onOpenToggle?: () => void;
  isControlledOpen?: boolean;
};

const StyledDiv = styled.div`
  margin-top: 16px;
`;

const StyledButton = withStyles({
  root: {
    margin: '16px',
  },
})(Button);

const connector = connect(null, {
  dispatchCreateReview: reviewCreateAsync,
  dispatchEditReview: reviewEditAsync,
});

const StyledInput = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(Input);

export class AddOrEditReviewDialog extends PureComponent<
  Props & ConnectedProps<typeof connector> & WithTranslation
> {
  state = {
    isOpen: false,
    selectedDate: new Date(),
  };

  onOpenToggle = () => {
    const { isOpen } = this.state;
    const { onOpenToggle } = this.props;

    if (onOpenToggle) {
      onOpenToggle();
    }

    this.setState({ isOpen: !isOpen });
  };

  getIsoDate = (date: string) => {
    const d = new Date(`${date} 13:00`);

    return d.toISOString();
  };

  onSubmit = (event: any) => {
    const {
      dispatchCreateReview,
      dispatchEditReview,
      restaurantId,
      defaultRestaurantValues,
    } = this.props;
    const { date, rating, title, review } = event.target.elements;

    if (defaultRestaurantValues) {
      const { reviewId } = defaultRestaurantValues;
      dispatchEditReview({
        data: {
          dateOfVisit: this.getIsoDate(date.value),
          reviewRatingId: rating.value,
          title: title.value,
          text: review.value,
          restaurantId,
        },
        reviewId,
      });
    } else {
      dispatchCreateReview({
        dateOfVisit: this.getIsoDate(date.value),
        reviewRatingId: rating.value,
        title: title.value,
        text: review.value,
        restaurantId,
      });
    }

    this.onOpenToggle();
  };

  onDateChange = (date: any) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { isControlledOpen, hideButton, defaultRestaurantValues, t } = this.props;
    const { isOpen, selectedDate } = this.state;

    return (
      <>
        {hideButton ? null : (
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutline />}
            data-cy="review-dialog-open"
            onClick={this.onOpenToggle}
          >
            {t('component.add-review-dialog.buttons.add')}
          </StyledButton>
        )}
        <FormDialog
          title={t('component.add-review-dialog.title')}
          submitButtonText={t('component.add-review-dialog.submit')}
          cancelButtonText={t('component.add-review-dialog.cancel')}
          onClose={this.onOpenToggle}
          isOpen={isControlledOpen !== undefined ? isControlledOpen : isOpen}
          onSubmit={this.onSubmit}
        >
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="none"
            id="date-picker-inline"
            name="date"
            label={t('component.add-review-dialog.date-of-visit')}
            value={selectedDate}
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.dateOfVisit : undefined}
            onChange={this.onDateChange}
          />
          <StyledDiv>
            <Rating
              name="rating"
              size="large"
              data-cy="review-dialog-rating"
              defaultValue={defaultRestaurantValues ? defaultRestaurantValues.reviewRatingId : 5}
            />
          </StyledDiv>
          <StyledInput
            id="idAddReviewDialogTitle"
            label={t('component.add-review-dialog.review-title')}
            name="title"
            required
            data-cy="review-dialog-title"
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.title : undefined}
            fullWidth
          />
          <StyledInput
            id="idAddReviewDialogReview"
            label={t('component.add-review-dialog.review')}
            name="review"
            data-cy="review-dialog-review"
            required
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.text : undefined}
            fullWidth
            rows={8}
            multiline
          />
        </FormDialog>
      </>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(AddOrEditReviewDialog));
