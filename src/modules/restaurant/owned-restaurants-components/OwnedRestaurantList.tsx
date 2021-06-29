import React, { PureComponent } from 'react';
import OwnedRestaurantListItem, { Props as RestaurantProps } from './OwnedRestaurantListItem';
import { PagedDto } from 'types/commonTypes';

type Props = {
  restaurants: PagedDto<RestaurantProps>;
};

export class OwnedRestaurantList extends PureComponent<Props> {
  render() {
    const { restaurants } = this.props;

    return restaurants.data.map(props => (
      <OwnedRestaurantListItem key={props.restaurantId} {...props} />
    ));
  }
}

export default OwnedRestaurantList;
