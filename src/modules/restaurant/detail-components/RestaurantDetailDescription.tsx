import React, { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import Typography from 'modules/common/components/controls/Typography';
import { Card, CardContent, withStyles } from '@material-ui/core';
import { I18N_CORE } from 'core/i18n/i18n';
import FileUploadDialog from 'modules/common/components/file-upload/FileUploadDialog';
import { API_ENDPOINT } from 'config/config';
import Avatar from '@material-ui/core/Avatar';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ImageService from 'services/imageService';
import { connect, ConnectedProps } from 'react-redux';
import { restaurantDetailAsync } from 'core/redux/ducks/RestaurantDuck';
import { RestaurantResponse } from '../../../services/restaurantService';
import { RootState } from '../../../core/redux/store';
import { getUserFromState } from '../../../core/redux/ducks/UserDuck';
import { Role } from '../../../utils/constants';

const StyledAvatar = withStyles({
  root: {
    height: '100%',
    width: '100%',
  },
})(Avatar);

const StyledMenuIcon = withStyles({
  root: {
    height: '100%',
    width: '100%',
  },
})(RestaurantMenuIcon);

type Props = {
  restaurant: RestaurantResponse;
};

const connector = connect(
  (state: RootState) => {
    return {
      user: getUserFromState(state),
    };
  },
  {
    dispatchGetRestaurant: restaurantDetailAsync,
  },
);

export class RestaurantDetailDescription extends PureComponent<
  Props & WithTranslation & ConnectedProps<typeof connector>
> {
  state = {
    isDialogOpen: false,
  };

  onToggleUploadDialog = () => {
    const { isDialogOpen } = this.state;

    this.setState({ isDialogOpen: !isDialogOpen });
  };

  onUploadFile = async (file: File) => {
    const {
      dispatchGetRestaurant,
      restaurant: { restaurantId },
    } = this.props;
    const formData = new FormData();
    formData.append('file', file);

    this.onToggleUploadDialog();
    await ImageService.uploadRestaurantImage({ data: formData, restaurantId });
    dispatchGetRestaurant(restaurantId);
  };

  render() {
    const {
      restaurant: { imageLink, description, ownerId },
      user,
      t,
    } = this.props;
    const { isDialogOpen } = this.state;
    const canEdit = user && (user.roleId === Role.Admin || user.userId === ownerId);

    return (
      <Card
        variant="outlined"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <StyledAvatar
          src={`${API_ENDPOINT}${imageLink}`}
          variant="square"
          onClick={canEdit ? this.onToggleUploadDialog : undefined}
          style={{
            height: '100%',
            maxHeight: '250px',
            maxWidth: '250px',
            cursor: canEdit ? 'pointer' : '',
          }}
        >
          <StyledMenuIcon />
        </StyledAvatar>
        {canEdit && (
          <FileUploadDialog
            onSubmit={this.onUploadFile}
            isOpen={isDialogOpen}
            onClose={this.onToggleUploadDialog}
          />
        )}
        <CardContent>
          <Typography variant="h5" component="h1">
            {t('component.restaurant-detail-description.title')}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(RestaurantDetailDescription));
