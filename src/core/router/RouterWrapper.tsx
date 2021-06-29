import React, { PureComponent } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { getRoutes } from './routes';
import AuthenticatedRoute from './AuthenticatedRoute';
import LayoutRenderer from 'modules/common/layouts/LayoutRenderer';
import HttpInterceptorWrapper from './HttpInterceptorWrapper';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getUserFromState, userInfoAsync } from 'core/redux/ducks/UserDuck';
import PageLoading from './PageLoading';

const connector = connect(
  (state: RootState) => {
    return {
      user: getUserFromState(state),
    };
  },
  {
    dispatchGetLoggedUser: userInfoAsync,
  },
);

class RouterWrapper extends PureComponent<ConnectedProps<typeof connector>> {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { dispatchGetLoggedUser } = this.props;

    try {
      await dispatchGetLoggedUser();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <PageLoading />;
    }

    return (
      <LayoutRenderer>
        <BrowserRouter>
          <HttpInterceptorWrapper>
            <Switch>
              {getRoutes().map(({ route, component, ...rest }) => {
                return (
                  // @ts-ignore
                  <AuthenticatedRoute key={route} path={route} component={component} {...rest} />
                );
              })}
            </Switch>
          </HttpInterceptorWrapper>
        </BrowserRouter>
      </LayoutRenderer>
    );
  }
}

export default connector(RouterWrapper);
