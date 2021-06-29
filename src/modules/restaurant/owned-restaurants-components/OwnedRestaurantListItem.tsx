import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import ReviewPendingReplyList from './ReviewPendingReplyList';
import { RouteComponentProps, withRouter } from 'react-router';
import { getRestaurantDetail } from 'core/router/urls';
import { RestaurantResponse } from 'services/restaurantService';
import RatingWrapper from '../common-components/RatingWrapper';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getPendingReviews, getPendingReviewsAsync } from 'core/redux/ducks/ReviewDuck';

export type Props = RestaurantResponse;

const connector = connect(
  (state: RootState, props: Props) => {
    const { restaurantId } = props;

    return {
      pendingReviews: getPendingReviews(state, restaurantId),
    };
  },
  {
    dispatchGetPendingReviews: getPendingReviewsAsync,
  },
);

export class OwnedRestaurantListItem extends PureComponent<
  ConnectedProps<typeof connector> & Props & WithTranslation & RouteComponentProps
> {
  public componentDidMount() {
    const { dispatchGetPendingReviews, restaurantId } = this.props;

    dispatchGetPendingReviews(restaurantId);
  }

  redirect = () => {
    const { restaurantId, history } = this.props;

    history.push(getRestaurantDetail(restaurantId));
  };

  render() {
    const { name, numberOfReviews, averageRating, pendingReviews, t } = this.props;

    return (
      <Card style={{ margin: '32px' }}>
        <CardActionArea onClick={this.redirect}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {name}
            </Typography>
            <RatingWrapper averageRating={averageRating} numberOfReviews={numberOfReviews} canEdit={false} />
          </CardContent>
        </CardActionArea>

        <Typography gutterBottom variant="body1" style={{ margin: '16px' }}>
          <i>
            {t(
              pendingReviews.size === 0
                ? 'component.owned-restaurant-item.no-pending'
                : 'component.owned-restaurant-item.pending',
            )}
          </i>
        </Typography>
        <ReviewPendingReplyList reviewsPendingReply={pendingReviews} />
      </Card>
    );
  }
}

export default withTranslation(I18N_CORE)(withRouter(connector(OwnedRestaurantListItem)));
