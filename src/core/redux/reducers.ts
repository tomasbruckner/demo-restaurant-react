import { combineReducers } from 'redux';

import RestaurantDuck from 'core/redux/ducks/RestaurantDuck';
import ReviewDuck from 'core/redux/ducks/ReviewDuck';
import UserDuck from 'core/redux/ducks/UserDuck';
import NotificationDuck from 'core/redux/ducks/NotificationDuck';
import SearchDuck from 'core/redux/ducks/SearchDuck';

export default combineReducers({
  UserDuck,
  NotificationDuck,
  RestaurantDuck,
  ReviewDuck,
  SearchDuck,
});
