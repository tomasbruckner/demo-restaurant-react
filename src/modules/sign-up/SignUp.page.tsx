import { Button, withStyles } from '@material-ui/core';
import Form from 'modules/common/components/controls/Form';
import { getUserFromState, signUpUserAsync } from 'core/redux/ducks/UserDuck';
import React, { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/macro';
import { I18N_CORE } from 'core/i18n/i18n';
import Input from 'modules/common/components/controls/Input';
import Typography from 'modules/common/components/controls/Typography';
import { UAParser } from 'ua-parser-js';
import { RootState } from 'core/redux/store';
import { Redirect } from 'react-router';
import { DEFAULT_ROUTE_BY_ROLE } from 'core/router/routes';
import { LOGIN } from 'core/router/urls';
import Divider from '../common/components/controls/Divider';
import Link from '../common/utils/Link';
import { green } from '@material-ui/core/colors';

const RegisterLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const RegisterCard = styled.div`
  position: relative;
  max-width: 530px;
  min-width: 530px;
  border: 1px solid ${p => p.theme.borderDark};
  border-radius: ${p => p.theme.borderRadius};
  box-sizing: border-box;
`;

const RegisterPadding = styled.div`
  padding: 40px 80px 50px 80px;
`;

const SignUpButton = withStyles({
  root: {
    height: '50px',
    marginTop: '32px',
    marginBottom: '32px',
    textTransform: 'none',
    boxShadow: 'none',
  },
})(Button);

const LoginButton = withStyles({
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
    signUpUser: signUpUserAsync,
  },
);

export class RegisterPageComp extends PureComponent<
  WithTranslation & ConnectedProps<typeof connector>
> {
  componentDidMount() {
    const { t } = this.props;
    document.title = t('page.login.title');
  }

  onSubmit = async (data: any = {}) => {
    const { signUpUser } = this.props;
    const { firstName, lastName, email, password } = data.target.elements;

    try {
      const parser = new UAParser();
      await signUpUser({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        device: parser.getUA(),
      });
    } catch (error) {
      // ignore
    }
  };

  render() {
    const { user, t } = this.props;

    if (user) {
      return <Redirect to={DEFAULT_ROUTE_BY_ROLE[user.roleId]} />;
    }

    return (
      <RegisterLayout>
        <StyledTypography variant="h3">{t('page.sign-up.text.h1')}</StyledTypography>
        <StyledTypography variant="h5">{t('page.sign-up.text.h2')}</StyledTypography>
        <RegisterCard>
          <RegisterPadding>
            <Typography variant="h5" align="center">
              {t('page.sign-up.text.free-account')}
            </Typography>
            <Form onSubmit={this.onSubmit}>
              <div>
                <MyInput
                  id="idSignUpFirstName"
                  label={t('page.sign-up.form.labels.first-name')}
                  name="firstName"
                  fullWidth
                  autoFocus
                  required
                />
              </div>
              <div>
                <MyInput
                  id="idSignUpLastName"
                  name="lastName"
                  fullWidth
                  label={t('page.sign-up.form.labels.last-name')}
                  required
                />
              </div>
              <div>
                <MyInput
                  id="idSignUpEmail"
                  name="email"
                  label={t('page.sign-up.form.labels.email')}
                  fullWidth
                  type="email"
                  required
                />
              </div>
              <div>
                <MyInput
                  id="idSignUpPassword"
                  name="password"
                  label={t('page.sign-up.form.labels.password')}
                  fullWidth
                  type="password"
                  required
                />
              </div>
              <SignUpButton
                variant="contained"
                type="submit"
                color="primary"
                data-cy="sign-up-submit"
                fullWidth
              >
                {t('page.sign-up.form.buttons.sign-up')}
              </SignUpButton>
            </Form>
            <Divider variant="fullWidth" />

            <LoginButton
              variant="contained"
              type="submit"
              color="primary"
              data-cy="login-submit"
              fullWidth
              // @ts-ignore
              component={Link}
              to={LOGIN}
            >
              {t('page.login.form.buttons.sign-in')}
            </LoginButton>
          </RegisterPadding>
        </RegisterCard>
      </RegisterLayout>
    );
  }
}

export default compose(withTranslation(I18N_CORE), connector)(RegisterPageComp);
