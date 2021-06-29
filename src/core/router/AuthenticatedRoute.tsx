import ErrorBoundary from 'modules/common/utils/ErrorBoundary';
import { LOGIN, ROOT } from './urls';
import { DEFAULT_ROUTE_BY_ROLE } from './routes';
import { getUserFromState } from 'core/redux/ducks/UserDuck';
import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'core/redux/store';
import NavigationLayout from 'modules/common/layouts/NavigationLayout';

type Props = {
  isUserLogged?: boolean;
  hasNavigation?: boolean;
  enabledForRoles?: number[];
  path: string;
  component: React.JSXElementConstructor<any>;
};

const connector = connect((state: RootState) => {
  return {
    user: getUserFromState(state),
  };
});

class AuthenticatedRoute extends PureComponent<Props & ConnectedProps<typeof connector>> {
  isAllowed = () => {
    const { enabledForRoles, user, path } = this.props;

    if (path === ROOT) {
      return false;
    }

    if (!user) {
      return !enabledForRoles;
    }

    return !enabledForRoles || enabledForRoles.includes(user.roleId);
  };

  render() {
    const { user, hasNavigation, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (this.isAllowed()) {
            if (hasNavigation) {
              return (
                <ErrorBoundary>
                  <NavigationLayout>
                    <Component {...props} />
                  </NavigationLayout>
                </ErrorBoundary>
              );
            }

            return (
              <ErrorBoundary>
                <Component {...props} />
              </ErrorBoundary>
            );
          }

          return <Redirect to={user ? DEFAULT_ROUTE_BY_ROLE[user.roleId] : LOGIN} />;
        }}
      />
    );
  }
}

export default connector(AuthenticatedRoute);
