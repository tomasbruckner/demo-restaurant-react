import React, { PureComponent, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getUserFromState } from 'core/redux/ducks/UserDuck';
import { Role } from 'utils/constants';

const connector = connect((state: RootState) => {
  return {
    user: getUserFromState(state),
  };
});

type Props = {
  onlyAdmin?: boolean;
  adminOrOwner?: boolean;
  renderNotAllowed?: ReactNode;
  children: React.ReactNode;
};

class RoleAccessRenderer extends PureComponent<Props & ConnectedProps<typeof connector>> {
  checkPermissions = () => {
    const { user, onlyAdmin, adminOrOwner } = this.props;

    if (!user) {
      return false;
    }

    if (onlyAdmin) {
      return user.roleId === Role.Admin;
    }

    if (adminOrOwner) {
      return user.roleId === Role.Admin || user.roleId === Role.Owner;
    }

    return false;
  };

  render() {
    const { children, renderNotAllowed = null } = this.props;

    if (this.checkPermissions()) {
      return children;
    }

    return renderNotAllowed;
  }
}

export default connector(RoleAccessRenderer);
