import React, { PureComponent } from 'react';
import PageLayout from '../common/layouts/PageLayout';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import OwnedRestaurantList from './owned-restaurants-components/OwnedRestaurantList';
import RestaurantAddDialog from './owned-restaurants-components/AddOrEditRestaurantDialog';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import {
  getOwnedRestaurantListFromState,
  ownedRestaurantFilterAsync,
} from 'core/redux/ducks/RestaurantDuck';
import { getUserFromState } from 'core/redux/ducks/UserDuck';
import Typography from '../common/components/controls/Typography';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components/macro';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';
import Pagination from '../common/components/controls/Pagination';

const StyledTypography = withStyles({
  root: {
    margin: '16px',
  },
})(Typography);

const StyledWrapper = styled.div``;

const connector = connect(
  (state: RootState) => {
    return {
      ownedRestaurants: getOwnedRestaurantListFromState(state),
      user: getUserFromState(state),
    };
  },
  {
    dispatchGetOwnedRestaurant: ownedRestaurantFilterAsync,
  },
);

class OwnedRestaurantListPage extends PureComponent<
  ConnectedProps<typeof connector> & WithTranslation
> {
  componentDidMount() {
    this.fetchOwned();
  }

  componentDidUpdate({ user: prevUser }: any) {
    const { user } = this.props;

    if (user && (!prevUser || user.userId !== prevUser.userId)) {
      this.fetchOwned();
    }
  }

  fetchOwned = () => {
    const { user, dispatchGetOwnedRestaurant } = this.props;

    if (user) {
      dispatchGetOwnedRestaurant({
        filter: {
          ownerId: user.userId,
        },
        take: DEFAULT_PAGE_SIZE,
      });
    }
  };

  onChange = (event: object, page: number) => {
    const { user, dispatchGetOwnedRestaurant } = this.props;

    dispatchGetOwnedRestaurant({
      filter: {
        ownerId: user!.userId,
      },
      take: DEFAULT_PAGE_SIZE,
      skip: (page - 1) * DEFAULT_PAGE_SIZE,
    });
  };

  render() {
    const { t, ownedRestaurants } = this.props;

    return (
      <PageLayout title={t('page.owned-restaurants.title')}>
        <RestaurantAddDialog />
        <StyledWrapper>
          {ownedRestaurants.size === 0 ? (
            <StyledTypography>{t('page.owned-restaurants.no-restaurants')}</StyledTypography>
          ) : (
            <OwnedRestaurantList restaurants={ownedRestaurants} />
          )}
        </StyledWrapper>
        {ownedRestaurants.size > DEFAULT_PAGE_SIZE && (
          <Pagination
            count={Math.ceil(ownedRestaurants.size / DEFAULT_PAGE_SIZE)}
            variant="outlined"
            color="primary"
            onChange={this.onChange}
          />
        )}
      </PageLayout>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(OwnedRestaurantListPage));
