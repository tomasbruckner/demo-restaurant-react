import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Typography, withStyles } from '@material-ui/core';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import RatingWrapper from '../common-components/RatingWrapper';
import { RouteComponentProps, withRouter } from 'react-router';
import { getRestaurantDetail } from 'core/router/urls';
import { RestaurantResponse } from 'services/restaurantService';
import { API_ENDPOINT } from 'config/config';
import Avatar from '@material-ui/core/Avatar';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const StyledAvatar = withStyles({
  root: {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
  },
})(Avatar);

const StyledMenuIcon = withStyles({
  root: {
    height: '100%',
    width: '100%',
  },
})(RestaurantMenuIcon);

export type Props = RestaurantResponse;

export class RestaurantListItem extends PureComponent<
  Props & WithTranslation & RouteComponentProps<{}>
> {
  redirect = () => {
    const { restaurantId, history } = this.props;

    history.push(getRestaurantDetail(restaurantId));
  };

  render() {
    const { name, description, numberOfReviews, averageRating, imageLink } = this.props;

    return (
      <Card
        style={{ margin: '16px', maxWidth: '40%' }}
        onClick={this.redirect}
        data-cy="restaurant-list-item"
      >
        <CardActionArea style={{ display: 'flex' }}>
          <StyledAvatar
            src={`${API_ENDPOINT}${imageLink}`}
            variant="square"
            style={{ height: '100%', maxHeight: '250px', maxWidth: '250px' }}
          >
            <StyledMenuIcon />
          </StyledAvatar>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {name}
            </Typography>
            <RatingWrapper
              averageRating={averageRating}
              numberOfReviews={numberOfReviews}
              canEdit={false}
            />
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withTranslation(I18N_CORE)(withRouter(RestaurantListItem));
