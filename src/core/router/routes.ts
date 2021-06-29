import NotAllowedPage from 'modules/common/NotAllowed.page';
import NotFoundPage from 'modules/common/NotFound.page';
import LoginPage from 'modules/login/Login.page';
import SignUpPage from 'modules/sign-up/SignUp.page';
import RestaurantListPage from 'modules/restaurant/RestaurantList.page';
import OwnedRestaurantListPage from 'modules/restaurant/OwnedRestaurantList.page';
import RestaurantDetailPage from 'modules/restaurant/RestaurantDetail.page';
import UserProfilePage from 'modules/user-profile/UserProfile.page';
import UserManagementPage from 'modules/user-management/UserManagement.page';
import { AdminOrOwner, AllRoles, OnlyAdmin, Role } from 'utils/constants';
import {
  LOGIN,
  NOT_ALLOWED,
  OWNED_RESTAURANTS,
  RESTAURANT_DETAIL,
  RESTAURANTS,
  ROOT,
  SIGN_UP,
  USER_MANAGEMENT,
  USER_PROFILE,
} from './urls';

export const DEFAULT_ROUTE_BY_ROLE = {
  [Role.Admin]: RESTAURANTS,
  [Role.Owner]: OWNED_RESTAURANTS,
  [Role.User]: RESTAURANTS,
};

const ALL_ROUTES = [
  {
    route: LOGIN,
    component: LoginPage,
    exact: true,
  },
  {
    route: SIGN_UP,
    component: SignUpPage,
    exact: true,
  },
  {
    route: RESTAURANTS,
    component: RestaurantListPage,
    hasNavigation: true,
    enabledForRoles: AllRoles,
  },
  {
    route: OWNED_RESTAURANTS,
    component: OwnedRestaurantListPage,
    hasNavigation: true,
    enabledForRoles: AdminOrOwner,
  },
  {
    route: RESTAURANT_DETAIL,
    component: RestaurantDetailPage,
    hasNavigation: true,
    enabledForRoles: AllRoles,
  },
  {
    route: USER_PROFILE,
    component: UserProfilePage,
    hasNavigation: true,
    enabledForRoles: AllRoles,
  },
  {
    route: USER_MANAGEMENT,
    component: UserManagementPage,
    hasNavigation: true,
    enabledForRoles: OnlyAdmin,
  },
  {
    route: NOT_ALLOWED,
    component: NotAllowedPage,
    exact: true,
  },
  {
    route: ROOT,
    component: null,
    exact: true,
  },
  {
    route: '*',
    component: NotFoundPage,
  },
];

export const getRoutes = () => ALL_ROUTES;
