import React, { PureComponent } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import ComputerIcon from '@material-ui/icons/Computer';
import NorthEastIcon from '@material-ui/icons/CallMade';
import RatingWrapper from '../common-components/RatingWrapper';
import styled from 'styled-components/macro';
import Typography from 'modules/common/components/controls/Typography';
import Divider from 'modules/common/components/controls/Divider';
import { withStyles } from '@material-ui/core';
import RestaurantService, { RestaurantResponse } from 'services/restaurantService';
import SimpleDialog from 'modules/common/components/dialogs/SimpleDialog';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { RESTAURANTS } from 'core/router/urls';
import RestaurantAddOrEditDialog from '../owned-restaurants-components/AddOrEditRestaurantDialog';
import { RootState } from '../../../core/redux/store';
import { getUserFromState } from '../../../core/redux/ducks/UserDuck';
import { connect, ConnectedProps } from 'react-redux';
import { Role } from '../../../utils/constants';

const StyledLink = styled.a`
  color: black;
  margin-left: 16px;
  margin-right: 16px;
  text-decoration: none;
  &:visited {
    color: black;
  }

  &:active {
    color: black;
  }

  &:hover {
    color: ${p => p.theme.primary};
  }

  &:link {
    color: black;
  }
`;

const StyledDivider = withStyles({
  root: {
    marginLeft: '16px',
    marginRight: '16px',
  },
})(Divider);

const StyledTypography = withStyles({
  root: {
    marginLeft: '8px',
    marginRight: '8px',
  },
})(Typography);

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMarginDiv = styled.div`
  margin-bottom: 16px;
`;

const connector = connect((state: RootState) => {
  return {
    user: getUserFromState(state),
  };
});

type Props = {
  restaurant: RestaurantResponse;
};

export class RestaurantDetailHeader extends PureComponent<
  Props & ConnectedProps<typeof connector> & WithTranslation & RouteComponentProps
> {
  state = {
    isEditOpen: false,
    isDeleteOpen: false,
  };

  onDelete = async () => {
    const {
      restaurant: { restaurantId },
      history,
    } = this.props;

    await RestaurantService.delete(restaurantId);
    history.push(RESTAURANTS);
  };

  onToggleEdit = () => {
    const { isEditOpen } = this.state;

    this.setState({ isEditOpen: !isEditOpen });
  };

  onToggleDelete = () => {
    const { isDeleteOpen } = this.state;

    this.setState({ isDeleteOpen: !isDeleteOpen });
  };

  render() {
    const { restaurant, user, t } = this.props;
    const { averageRating, address, contactPhone, numberOfReviews = 0, websiteUrl, name, ownerId } =
      restaurant || {};
    const { isEditOpen, isDeleteOpen } = this.state;

    return (
      <StyledMarginDiv>
        <StyledDiv>
          <StyledTypography variant="h4" display="inline">
            {`${averageRating}`.substring(0, 3)}
          </StyledTypography>
          <RatingWrapper
            averageRating={averageRating}
            numberOfReviews={numberOfReviews}
            canEdit={user!.roleId === Role.Admin || user!.userId === ownerId}
            onDelete={this.onToggleDelete}
            onEdit={this.onToggleEdit}
          />
          <SimpleDialog
            onClose={this.onToggleDelete}
            onSubmit={this.onDelete}
            isOpen={isDeleteOpen}
            text={t('component.restaurant-detail-header.delete-text', { name })}
            title={t('component.restaurant-detail-header.delete-title')}
          />
          <RestaurantAddOrEditDialog
            defaultRestaurantValues={restaurant}
            isControlledOpen={isEditOpen}
            onOpenToggle={this.onToggleEdit}
            hideButton
          />
        </StyledDiv>
        <StyledDiv>
          <StyledSpan>
            <LocationOnIcon />
            <StyledTypography display="inline">{address}</StyledTypography>
          </StyledSpan>
          <StyledDivider orientation="vertical" flexItem />
          <StyledSpan>
            <CallIcon />
            <StyledTypography display="inline">{contactPhone}</StyledTypography>
          </StyledSpan>
          <StyledDivider orientation="vertical" flexItem />
          <StyledSpan>
            <ComputerIcon />
            <Typography component={StyledLink} href={websiteUrl} gutterBottom>
              <u>{websiteUrl}</u>
            </Typography>
            <NorthEastIcon />
          </StyledSpan>
        </StyledDiv>
      </StyledMarginDiv>
    );
  }
}

export default withTranslation(I18N_CORE)(withRouter(connector(RestaurantDetailHeader)));
