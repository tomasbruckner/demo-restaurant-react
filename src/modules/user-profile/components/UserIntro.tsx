import React, { ComponentType, PureComponent } from 'react';
import { UserResponse } from 'services/userService';
import { Card, CardContent, withStyles } from '@material-ui/core';
import Typography from 'modules/common/components/controls/Typography';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import { formatDate } from 'utils/commonUtils';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import BeenHereIcon from '@material-ui/icons/Beenhere';
import styled from 'styled-components/macro';

const StyledTypography = withStyles({
  root: {
    marginBottom: '16px',
  },
})(Typography);

const getStyledIcon = (Component: ComponentType) =>
  withStyles({
    root: {
      marginRight: '8px',
    },
  })(Component);

const StyledPersonAddIcon = getStyledIcon(PersonAddIcon);
const StyledMailOutlineIcon = getStyledIcon(MailOutlineIcon);
const StyledFaceIcon = getStyledIcon(FaceIcon);
const StyledBeenHereIcon = getStyledIcon(BeenHereIcon);

const StyledFlexDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

type Props = {
  user: UserResponse;
};

export class UserIntro extends PureComponent<Props & WithTranslation> {
  render() {
    const {
      t,
      user: { created, roleId, email, firstName, lastName },
    } = this.props;

    return (
      <Card variant="outlined">
        <CardContent>
          <StyledTypography variant="h5">{t('component.user-intro.title')}</StyledTypography>
          <StyledFlexDiv>
            <StyledFaceIcon />
            <Typography display="inline" variant="body2" component="p">
              {`${firstName} ${lastName}`}
            </Typography>
          </StyledFlexDiv>
          <StyledFlexDiv>
            <StyledMailOutlineIcon />
            <Typography display="inline" variant="body2" component="p">
              {email}
            </Typography>
          </StyledFlexDiv>
          <StyledFlexDiv>
            <StyledBeenHereIcon />
            <Typography display="inline" variant="body2" component="p">
              {t(`component.user-intro.role-${roleId}`)}
            </Typography>
          </StyledFlexDiv>
          <StyledFlexDiv>
            <StyledPersonAddIcon />
            <Typography display="inline" variant="body2" component="p">
              {t('component.user-intro.joined', { date: formatDate(created) })}
            </Typography>
          </StyledFlexDiv>
        </CardContent>
      </Card>
    );
  }
}

export default withTranslation(I18N_CORE)(UserIntro);
