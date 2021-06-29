import React, { PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from 'modules/common/components/controls/Typography';
import Link from 'modules/common/utils/Link';
import styled from 'styled-components/macro';
import { WithTranslation, withTranslation } from 'react-i18next';
import { I18N_CORE } from 'core/i18n/i18n';
import { OWNED_RESTAURANTS, RESTAURANTS, USER_MANAGEMENT } from 'core/router/urls';
import ProfileNavigation from './ProfileNavigation';
import NavigationSearchInput from './NavigationSearchInput';
import RoleAccessRenderer from '../../utils/RoleAccessRenderer';

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const LinkWrapper = styled.div<Props>`
  display: flex;
  margin-left: 32px;
`;

const StyledLink = styled(Link)`
  color: white;
  margin-right: 16px;
  text-decoration: none;
  &:visited {
    color: white;
  }

  &:active {
    color: white;
  }

  &:hover {
    color: white;
  }

  &:link {
    color: white;
  }
`;

type Props = {};

class NavigationComponent extends PureComponent<Props & WithTranslation> {
  render() {
    const { t } = this.props;

    return (
      <FlexGrow>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap>
              {t('component.navigation.home')}
            </Typography>
            <NavigationSearchInput />
            <div />
            <LinkWrapper>
              <Typography component={StyledLink} to={RESTAURANTS}>
                {t('component.navigation.links.restaurants')}
              </Typography>
              <RoleAccessRenderer adminOrOwner>
                <Typography component={StyledLink} to={OWNED_RESTAURANTS}>
                  {t('component.navigation.links.owned-restaurants')}
                </Typography>
              </RoleAccessRenderer>
              <RoleAccessRenderer onlyAdmin>
                <Typography component={StyledLink} to={USER_MANAGEMENT}>
                  {t('component.navigation.links.users')}
                </Typography>
              </RoleAccessRenderer>
            </LinkWrapper>
            <FlexGrow />
            <div>
              <ProfileNavigation />
            </div>
          </Toolbar>
        </AppBar>
      </FlexGrow>
    );
  }
}

export default withTranslation(I18N_CORE)(NavigationComponent);
