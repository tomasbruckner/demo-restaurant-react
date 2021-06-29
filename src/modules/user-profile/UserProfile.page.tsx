import React, { PureComponent } from 'react';
import PageLayout from '../common/layouts/PageLayout';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { getUserFromState } from 'core/redux/ducks/UserDuck';
import { compose } from 'redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { I18N_CORE } from 'core/i18n/i18n';
import UserProfileImage from './components/UserProfileImage';
import UserIntro from './components/UserIntro';
import LastReviewList from './components/LastReviewList';
import { getUserLastReviewsFromState, userLastReviewsAsync } from 'core/redux/ducks/ReviewDuck';
import Typography from 'modules/common/components/controls/Typography';
import styled from 'styled-components/macro';
import { withStyles } from '@material-ui/core';

const StyledFlexDiv = styled.div`
  display: flex;
`;

const StyledTypography = withStyles({
  root: {
    marginBottom: '16px',
  },
})(Typography);

const connector = connect(
  (state: RootState) => {
    return {
      user: getUserFromState(state),
      lastReviews: getUserLastReviewsFromState(state),
    };
  },
  {
    dispatchGetUserLastReviews: userLastReviewsAsync,
  },
);

type Props = {};

class UserProfileComponent extends PureComponent<
  Props & WithTranslation & ConnectedProps<typeof connector>
> {
  public componentDidMount() {
    this.getReviews();
  }

  componentDidUpdate({
    user: prevUser,
  }: Readonly<WithTranslation & ConnectedProps<typeof connector>>) {
    const { user } = this.props;

    if (!prevUser && user) {
      this.getReviews();
    }
  }

  getReviews = () => {
    const { dispatchGetUserLastReviews, user } = this.props;

    if (user) {
      dispatchGetUserLastReviews(user.userId);
    }
  };

  render() {
    const { user, lastReviews, t } = this.props;

    if (!user) {
      return <PageLayout title="" isLoading />;
    }

    return (
      <PageLayout title={`${user.firstName} ${user.lastName}`}>
        <StyledFlexDiv>
          <div style={{ minWidth: '25%', margin: '32px' }}>
            <UserProfileImage imageLink={user.imageLink} />
            <UserIntro user={user} />
          </div>
          <div style={{ minWidth: '50%' }}>
            <StyledTypography variant="h4">{t('page.user-profile.last-reviews')}</StyledTypography>
            {lastReviews.size === 0 ? (
              <Typography>{t('page.user-profile.no-reviews')}</Typography>
            ) : (
              <LastReviewList reviews={lastReviews} />
            )}
          </div>
        </StyledFlexDiv>
      </PageLayout>
    );
  }
}

export default compose(withTranslation(I18N_CORE), connector)(UserProfileComponent);
