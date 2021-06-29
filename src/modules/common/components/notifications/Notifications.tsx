import Snackbar from '@material-ui/core/Snackbar';
import { getNotificationSelector, removeNotification } from 'core/redux/ducks/NotificationDuck';
import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import NotificationContent from './NotificationContent';
import { RootState } from 'core/redux/store';

const NOTIFICATION_TIMEOUT = 5000;

const mapStateToProps = (state: RootState) => {
  return {
    notification: getNotificationSelector(state),
  };
};

const mapDispatchToProps = {
  removeNotificationAction: removeNotification,
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export class Notifications extends PureComponent<ConnectedProps<typeof connector>> {
  notificationTimeoutId?: number = undefined;

  componentDidUpdate() {
    const { notification, removeNotificationAction } = this.props;

    if (notification) {
      clearTimeout(this.notificationTimeoutId);
      this.notificationTimeoutId = setTimeout(removeNotificationAction, NOTIFICATION_TIMEOUT);
    }
  }

  render() {
    const { notification, removeNotificationAction } = this.props;

    if (!notification) {
      return null;
    }

    const { message, variant } = notification;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={!!notification}
      >
        <NotificationContent
          onClose={removeNotificationAction}
          variant={variant}
          message={message}
        />
      </Snackbar>
    );
  }
}

export default connector(Notifications);
