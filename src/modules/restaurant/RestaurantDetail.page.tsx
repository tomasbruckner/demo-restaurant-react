import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getRestaurantFromState, restaurantDetailAsync } from 'core/redux/ducks/RestaurantDuck';
import PageLayout from 'modules/common/layouts/PageLayout';
import { RouteComponentProps, withRouter } from 'react-router';
import RestaurantDetailHeader from './detail-components/RestaurantDetailHeader';
import RestaurantDetailDescription from './detail-components/RestaurantDetailDescription';
import AddReviewDialog from './detail-components/AddOrEditReviewDialog';
import Typography from 'modules/common/components/controls/Typography';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import ReviewList from './detail-components/ReviewList';
import {
  getBestReviewAsync,
  getBestReviewFromState,
  getCurrentUserReviewAsync,
  getCurrentUserReviewFromState,
  getReviewListFromState,
  getWorstReviewAsync,
  getWorstReviewFromState,
  reviewFilterAsync,
} from 'core/redux/ducks/ReviewDuck';
import Pagination from 'modules/common/components/controls/Pagination';
import ReviewDetail from './detail-components/ReviewDetail';
import { withStyles } from '@material-ui/core';
import { DEFAULT_PAGE_SIZE } from 'utils/constants';
import { getUserFromState } from 'core/redux/ducks/UserDuck';

const connector = connect(
  (state: RootState) => {
    return {
      restaurant: getRestaurantFromState(state),
      reviews: getReviewListFromState(state),
      bestReview: getBestReviewFromState(state),
      worstReview: getWorstReviewFromState(state),
      currentUserReview: getCurrentUserReviewFromState(state),
      user: getUserFromState(state),
    };
  },
  {
    dispatchGetRestaurant: restaurantDetailAsync,
    dispatchGetReviews: reviewFilterAsync,
    dispatchGetBestReview: getBestReviewAsync,
    dispatchGetWorstReview: getWorstReviewAsync,
    dispatchGetCurrentUserReview: getCurrentUserReviewAsync,
  },
);

const StyledTypography = withStyles({
  root: {
    margin: '8px',
  },
})(Typography);

type Props = { restaurantId: string };

class RestaurantDetailPage extends PureComponent<
  RouteComponentProps<Props> & ConnectedProps<typeof connector> & WithTranslation
> {
  componentDidMount() {
    this.fetchData();
  }

  public componentDidUpdate({
    match: {
      params: { restaurantId: previousRestaurantIdFromRoute },
    },
  }: Readonly<RouteComponentProps<Props> & ConnectedProps<typeof connector> & WithTranslation>) {
    const {
      match: {
        params: { restaurantId: restaurantIdFromRoute },
      },
    } = this.props;
    if (restaurantIdFromRoute !== previousRestaurantIdFromRoute) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const {
      match: {
        params: { restaurantId: restaurantIdFromRoute },
      },
      dispatchGetRestaurant,
      dispatchGetReviews,
      dispatchGetBestReview,
      dispatchGetWorstReview,
      dispatchGetCurrentUserReview,
      user,
    } = this.props;

    const restaurantId = Number(restaurantIdFromRoute);
    dispatchGetRestaurant(restaurantId);
    dispatchGetBestReview(restaurantId);
    dispatchGetWorstReview(restaurantId);
    dispatchGetCurrentUserReview({ restaurantId, ownerId: user!.userId });
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
  };

  onChange = (event: object, page: number) => {
    const {
      match: {
        params: { restaurantId: restaurantIdFromRoute },
      },
      dispatchGetReviews,
    } = this.props;
    const restaurantId = Number(restaurantIdFromRoute);

    dispatchGetReviews({
      sort: {
        predicate: 'created',
        reverse: true,
      },
      skip: (page - 1) * DEFAULT_PAGE_SIZE,
      take: DEFAULT_PAGE_SIZE,
      filter: {
        restaurantId,
      },
    });
  };

  render() {
    const { restaurant, reviews, bestReview, worstReview, t } = this.props;

    if (!restaurant) {
      return null;
    }
    const {
      restaurantId,
      name,
      hasCurrentUserReviewed,
    } = restaurant;

    return (
      <PageLayout title={name}>
        <RestaurantDetailHeader restaurant={restaurant} />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ maxWidth: '40%', minWidth: '30%' }}>
            <RestaurantDetailDescription restaurant={restaurant} />
          </div>
          <div style={{ maxWidth: '20%', minWidth: '20%' }}>
            <ReviewDetail data={bestReview} positive />
          </div>
          <div style={{ maxWidth: '20%', minWidth: '20%' }}>
            <ReviewDetail data={worstReview} positive={false} />
          </div>
        </div>
        <div>
          <StyledTypography variant="h5">
            {t('page.restaurant-detail.review-title', { numberOfReviews: reviews.size })}
          </StyledTypography>
          {!hasCurrentUserReviewed && <AddReviewDialog restaurantId={restaurantId} />}
        </div>
        <ReviewList reviews={reviews} />
        {reviews.size > DEFAULT_PAGE_SIZE && (
          <Pagination
            count={Math.ceil(reviews.size / DEFAULT_PAGE_SIZE)}
            variant="outlined"
            color="primary"
            onChange={this.onChange}
          />
        )}
      </PageLayout>
    );
  }
}

export default withTranslation(I18N_CORE)(withRouter(connector(RestaurantDetailPage)));
