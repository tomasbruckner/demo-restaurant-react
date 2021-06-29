import { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { registerLogoutInterceptor, unregisterInterceptor } from 'utils/httpHandler';
import StorageService from 'services/storageService';
import { LOGIN } from './urls';

class HttpInterceptorWrapper extends PureComponent<RouteComponentProps> {
  responseInterceptorId: number | null = null;

  componentDidMount() {
    this.responseInterceptorId = registerLogoutInterceptor(this.onLogout);
  }

  componentWillUnmount() {
    if (this.responseInterceptorId !== null) {
      unregisterInterceptor(this.responseInterceptorId);
    }
  }

  onLogout = () => {
    const { history } = this.props;

    StorageService.setToken('');
    history.push(LOGIN);
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter(HttpInterceptorWrapper);
