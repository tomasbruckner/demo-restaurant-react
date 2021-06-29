import React, { PureComponent } from 'react';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Typography from 'modules/common/components/controls/Typography';
import Rating from 'modules/common/components/controls/Rating';
import { connect, ConnectedProps } from 'react-redux';
import { restaurantFilterAsync } from 'core/redux/ducks/RestaurantDuck';
import { DEFAULT_PAGE_SIZE } from 'utils/constants';
import styled from 'styled-components/macro';

const connector = connect(null, {
  dispatchFilterRestaurants: restaurantFilterAsync,
});

const StyledDiv = styled.div`
  margin: 32px;
`;

export class RestaurantFilter extends PureComponent<
  WithTranslation & ConnectedProps<typeof connector>
> {
  onChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    const { dispatchFilterRestaurants } = this.props;

    dispatchFilterRestaurants({
      take: DEFAULT_PAGE_SIZE,
      sort: {
        predicate: 'averageRating',
        reverse: true,
      },
      filter: {
        averageRating: value,
      },
    });
  };

  render() {
    const { t } = this.props;

    return (
      <StyledDiv>
        <Typography>{t('component.restaurant-filter.rating-filter')} </Typography>
        <Rating precision={0.5} onChange={this.onChange} name="rating" />
      </StyledDiv>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(RestaurantFilter));
