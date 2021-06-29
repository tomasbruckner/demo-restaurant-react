import React, { PureComponent } from 'react';
import Button from 'modules/common/components/controls/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Input from 'modules/common/components/controls/Input';
import FormDialog from 'modules/common/components/dialogs/FormDialog';
import { withStyles } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { restaurantCreateAsync, restaurantEditAsync } from 'core/redux/ducks/RestaurantDuck';
import { RouteComponentProps, withRouter } from 'react-router';
import { getRestaurantDetail } from 'core/router/urls';
import { RestaurantResponse } from 'services/restaurantService';
import { setErrorNotification } from 'core/redux/ducks/NotificationDuck';

const MyInput = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: '98%',
  },
}))(Input);

const connector = connect(null, {
  createRestaurant: restaurantCreateAsync,
  editRestaurant: restaurantEditAsync,
  dispatchErrorNotification: setErrorNotification,
});

type Props = {
  defaultRestaurantValues?: RestaurantResponse;
  hideButton?: boolean;
  onOpenToggle?: () => void;
  isControlledOpen?: boolean;
};

export class AddOrEditRestaurantDialog extends PureComponent<
  Props & RouteComponentProps & ConnectedProps<typeof connector> & WithTranslation
> {
  state = {
    isOpen: false,
  };

  onOpenToggle = () => {
    const { isOpen } = this.state;
    const { onOpenToggle } = this.props;

    if (onOpenToggle) {
      onOpenToggle();
    }
    this.setState({ isOpen: !isOpen });
  };

  onSubmit = async (data: any = {}) => {
    const { name, phone, description, address, url } = data.target.elements;
    const {
      createRestaurant,
      editRestaurant,
      history,
      defaultRestaurantValues,
      dispatchErrorNotification,
      t,
    } = this.props;
    const requestData = {
      address: address.value,
      name: name.value,
      contactPhone: phone.value,
      description: description.value,
      websiteUrl: url.value,
    };

    if (defaultRestaurantValues) {
      const { restaurantId } = defaultRestaurantValues;
      try {
        await editRestaurant({ restaurantId, data: requestData });
      } catch (e) {
        dispatchErrorNotification({ message: t('component.restaurant-add-dialog.error-conflict') });
      }
      this.onOpenToggle();
    } else {
      try {
        const res = await createRestaurant(requestData);
        const { restaurantId } = res.payload as RestaurantResponse;
        history.push(getRestaurantDetail(restaurantId));
      } catch (e) {
        dispatchErrorNotification({ message: t('component.restaurant-add-dialog.error-conflict') });
      }
    }
  };

  render() {
    const { t, defaultRestaurantValues, isControlledOpen, hideButton } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        {hideButton ? null : (
          <Button
            variant="outlined"
            color="primary"
            data-cy="restaurant-create-button"
            startIcon={<AddCircleOutline />}
            onClick={this.onOpenToggle}
          >
            {t('page.owned-restaurants.buttons.add')}
          </Button>
        )}
        <FormDialog
          title={t('component.restaurant-add-dialog.title')}
          submitButtonText={t('component.restaurant-add-dialog.submit')}
          cancelButtonText={t('component.restaurant-add-dialog.cancel')}
          onClose={this.onOpenToggle}
          isOpen={isControlledOpen !== undefined ? isControlledOpen : isOpen}
          onSubmit={this.onSubmit}
        >
          <MyInput
            id="idReviewReplyDialogName"
            label={t('component.restaurant-add-dialog.name')}
            name="name"
            autoFocus
            required
            data-cy="restaurant-add-name"
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.name : undefined}
            inputProps={{
              maxLength: 500,
            }}
            fullWidth
          />
          <MyInput
            id="idReviewReplyDialogWebsiteUrl"
            label={t('component.restaurant-add-dialog.website-url')}
            name="url"
            required
            data-cy="restaurant-add-url"
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.websiteUrl : undefined}
            inputProps={{
              maxLength: 500,
            }}
            fullWidth
          />
          <MyInput
            id="idReviewReplyDialogContactPhone"
            label={t('component.restaurant-add-dialog.phone')}
            name="phone"
            required
            data-cy="restaurant-add-phone"
            defaultValue={
              defaultRestaurantValues ? defaultRestaurantValues.contactPhone : undefined
            }
            inputProps={{
              maxLength: 100,
            }}
            fullWidth
          />
          <MyInput
            id="idReviewReplyDialogAddress"
            label={t('component.restaurant-add-dialog.address')}
            name="address"
            required
            data-cy="restaurant-add-address"
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.address : undefined}
            inputProps={{
              maxLength: 500,
            }}
            fullWidth
          />
          <MyInput
            id="idReviewReplyDialogDescription"
            label={t('component.restaurant-add-dialog.description')}
            name="description"
            required
            data-cy="restaurant-add-description"
            defaultValue={defaultRestaurantValues ? defaultRestaurantValues.description : undefined}
            fullWidth
            rows={8}
            multiline
          />
        </FormDialog>
      </>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(withRouter(AddOrEditRestaurantDialog)));
