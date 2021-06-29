import { Button, withStyles } from '@material-ui/core';
import Form from 'modules/common/components/controls/Form';
import { getUserFromState, loginUserAsync } from 'core/redux/ducks/UserDuck';
import React, { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/macro';
import { I18N_CORE } from 'core/i18n/i18n';
import Input from 'modules/common/components/controls/Input';
import Divider from 'modules/common/components/controls/Divider';
import { green } from '@material-ui/core/colors';
import Typography from 'modules/common/components/controls/Typography';
import Link from 'modules/common/utils/Link';
import { DEFAULT_ROUTE_BY_ROLE } from 'core/router/routes';
import { SIGN_UP } from 'core/router/urls';
import { UAParser } from 'ua-parser-js';
import Logger from 'utils/logger';
import { RootState } from 'core/redux/store';
import { Redirect } from 'react-router';

const LoginLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginCard = styled.div`
  position: relative;
  max-width: 530px;
  min-width: 530px;
  border: 1px solid ${p => p.theme.borderDark};
  border-radius: ${p => p.theme.borderRadius};
  box-sizing: border-box;
`;

const LoginPadding = styled.div`
  padding: 40px 80px 50px 80px;
`;

const LoginButton = withStyles({
  root: {
    height: '50px',
    marginTop: '32px',
    marginBottom: '32px',
    textTransform: 'none',
    boxShadow: 'none',
  },
})(Button);

const SignUpButton = withStyles({
  root: {
    height: '50px',
    marginTop: '32px',
    marginBottom: '32px',
    textTransform: 'none',
    boxShadow: 'none',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
})(Button);

const MyInput = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(Input);

const StyledTypography = withStyles({
  root: {
    margin: '16px',
  },
})(Typography);

const connector = connect(
  (state: RootState) => {
    return {
      user: getUserFromState(state),
    };
  },
  {
    loginUser: loginUserAsync,
  },
);

export class LoginPageComp extends PureComponent<
  WithTranslation & ConnectedProps<typeof connector>
> {
  state = {
    emailInput: '',
    passwordInput: '',
  };

  onSubmit = async () => {
    const { loginUser } = this.props;
    const { emailInput: email, passwordInput: password } = this.state;

    try {
      const parser = new UAParser();
      await loginUser({
        email,
        password,
        device: parser.getUA(),
      });
    } catch (error) {
      Logger.error(error);
    }
  };

  onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const { user, t } = this.props;

    if (user) {
      return <Redirect to={DEFAULT_ROUTE_BY_ROLE[user.roleId]} />;
    }

    return (
      <LoginLayout>
        <StyledTypography variant="h3">{t('page.login.text.welcome')}</StyledTypography>
        <StyledTypography variant="h5">{t('page.login.text.best')}</StyledTypography>
        <LoginCard>
          <LoginPadding>
            <Form onSubmit={this.onSubmit}>
              <div>
                <MyInput
                  id="idLoginEmail"
                  label={t('page.login.form.labels.email')}
                  name="emailInput"
                  autoFocus
                  onChange={this.onInputChange}
                  fullWidth
                  type="email"
                  data-cy="login-username"
                  required
                />
              </div>
              <div>
                <MyInput
                  id="idLoginPassword"
                  label={t('page.login.form.labels.password')}
                  name="passwordInput"
                  onChange={this.onInputChange}
                  fullWidth
                  type="password"
                  data-cy="login-password"
                  required
                />
              </div>
              <LoginButton
                variant="contained"
                type="submit"
                color="primary"
                data-cy="login-submit"
                fullWidth
              >
                {t('page.login.form.buttons.sign-in')}
              </LoginButton>
            </Form>
            <Divider variant="fullWidth" />

            <SignUpButton
              variant="contained"
              type="submit"
              color="primary"
              data-cy="login-register"
              fullWidth
              // @ts-ignore
              component={Link}
              to={SIGN_UP}
            >
              {t('page.login.form.buttons.register')}
            </SignUpButton>
          </LoginPadding>
        </LoginCard>
      </LoginLayout>
    );
  }
}

export default compose(withTranslation(I18N_CORE), connector)(LoginPageComp);
