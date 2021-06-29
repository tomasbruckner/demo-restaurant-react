import React, { PureComponent } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Link from 'modules/common/utils/Link';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { LOGIN, USER_PROFILE } from 'core/router/urls';
import { RouteComponentProps, withRouter } from 'react-router';
import { logOut } from 'core/redux/ducks/UserDuck';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(null, {
  dispatchLogOut: logOut,
});

class ProfileNavigationComponent extends PureComponent<
  WithTranslation & ConnectedProps<typeof connector> & RouteComponentProps
> {
  state = {
    anchorEl: null,
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onProfileClick = ({ currentTarget }: React.SyntheticEvent) => {
    this.setState({ anchorEl: currentTarget });
  };

  onLogoutClick = () => {
    const { history, dispatchLogOut } = this.props;

    dispatchLogOut();
    history.push(LOGIN);
  };

  render() {
    const { anchorEl } = this.state;
    const { t } = this.props;

    return (
      <>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={this.onProfileClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!anchorEl}
          onClose={this.onMenuClose}
        >
          <MenuItem to={USER_PROFILE} component={Link}>
            {t('component.navigation.menu.profile')}
          </MenuItem>
          <MenuItem onClick={this.onLogoutClick}>{t('component.navigation.menu.logout')}</MenuItem>
        </Menu>
      </>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(withRouter(ProfileNavigationComponent)));
