import Link from 'modules/common/utils/Link';
import React, { PureComponent } from 'react';

export class RestaurantDetailLink extends PureComponent<{
  restaurantName: string;
  restaurantId: number;
}> {
  render() {
    const { restaurantName, restaurantId } = this.props;

    return <Link to={`restaurant/${restaurantId}/${restaurantName}`}>{restaurantName}</Link>;
  }
}

export default RestaurantDetailLink;
