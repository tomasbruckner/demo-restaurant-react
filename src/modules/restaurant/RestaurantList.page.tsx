import React, { PureComponent } from 'react';
import { compose } from 'redux';
import PageLayout from '../common/layouts/PageLayout';
import { WithTranslation, withTranslation } from 'react-i18next';
import { I18N_CORE } from 'core/i18n/i18n';
import RestaurantList from './restaurants-components/RestaurantList';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getRestaurantListFromState, restaurantFilterAsync } from 'core/redux/ducks/RestaurantDuck';
import Pagination from 'modules/common/components/controls/Pagination';
import { DEFAULT_PAGE_SIZE } from 'utils/constants';
import RestaurantFilter from './restaurants-components/RestaurantFilter';
import Typography from 'modules/common/components/controls/Typography';
import styled from 'styled-components/macro';

const connector = connect(
  (state: RootState) => {
    return {
      restaurants: getRestaurantListFromState(state),
    };
  },
  {
    dispatchRestaurants: restaurantFilterAsync,
  },
);

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export class RestaurantListPage extends PureComponent<
  WithTranslation & ConnectedProps<typeof connector>
> {
  public componentDidMount() {
    const { dispatchRestaurants } = this.props;

    dispatchRestaurants({
      take: DEFAULT_PAGE_SIZE,
      sort: {
        predicate: 'averageRating',
        reverse: true,
      },
    });
  }

  onChange = (event: object, page: number) => {
    const { dispatchRestaurants } = this.props;

    dispatchRestaurants({
      take: DEFAULT_PAGE_SIZE,
      skip: (page - 1) * DEFAULT_PAGE_SIZE,
      sort: {
        predicate: 'averageRating',
        reverse: true,
      },
    });
  };

  render() {
    const { t, restaurants } = this.props;

    return (
      <PageLayout title={t('page.restaurants.title')}>
        <RestaurantFilter />
        <StyledWrapper>
          {restaurants.size === 0 ? (
            <Typography>{t('page.restaurants.no-restaurants')}</Typography>
          ) : (
            <RestaurantList restaurants={restaurants} />
          )}
        </StyledWrapper>{' '}
        {restaurants.size > DEFAULT_PAGE_SIZE && (
          <Pagination
            count={Math.ceil(restaurants.size / DEFAULT_PAGE_SIZE)}
            variant="outlined"
            color="primary"
            onChange={this.onChange}
          />
        )}
      </PageLayout>
    );
  }
}

export default compose(withTranslation(I18N_CORE))(connector(RestaurantListPage));
