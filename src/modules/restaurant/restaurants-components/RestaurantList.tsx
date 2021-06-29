import React, { PureComponent } from 'react';
import RestaurantListItem, { Props as RestaurantProps } from './RestaurantListItem';
import { PagedDto } from 'types/commonTypes';

type Props = {
  restaurants: PagedDto<RestaurantProps>;
};

export class RestaurantList extends PureComponent<Props> {
  render() {
    const { restaurants } = this.props;

    return restaurants.data.map(props => (
      <RestaurantListItem key={props.restaurantId} {...props} />
    ));
  }
}

export default RestaurantList;
