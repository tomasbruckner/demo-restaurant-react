import React, { PureComponent } from 'react';
import { I18N_CORE } from 'core/i18n/i18n';
import { Trans, WithTranslation, withTranslation } from 'react-i18next';
import { Card, CardContent, withStyles } from '@material-ui/core';
import Typography from 'modules/common/components/controls/Typography';
import { formatDate } from 'utils/commonUtils';
import Rating from 'modules/common/components/controls/Rating';
import { ReviewResponse } from 'services/reviewService';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDown';
import styled from 'styled-components/macro';
import { getRestaurantDetail } from 'core/router/urls';
import Link from 'modules/common/utils/Link';

const StyledThumpUp = withStyles({
  root: {
    color: 'green',
    marginLeft: '16px',
  },
})(ThumbUpAltIcon);

const StyledThumpDown = withStyles({
  root: {
    color: 'red',
    marginLeft: '16px',
  },
})(ThumbDownAltIcon);

const StyledTypographyFlex = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
})(Typography);

const StyledStrong = styled.strong`
  margin-right: 8px;
`;

const StyledTypography = withStyles({
  root: {
    margin: '16px',
  },
})(Typography);

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
  }

  &:active {
    color: black;
  }

  &:hover {
    color: black;
  }

  &:link {
    color: black;
  }
`;

const StyledRating = withStyles({
  root: {
    margin: '16px',
    marginBottom: 0,
  },
})(Rating);

const StyledCard = withStyles({
  root: {
    margin: 0,
  },
})(Card);

type Props = { positive?: boolean; data?: ReviewResponse; withRestaurantLink?: boolean };

export class ReviewDetail extends PureComponent<Props & WithTranslation> {
  render() {
    const { data, t, positive, withRestaurantLink } = this.props;

    if (!data) {
      return (
        <Card variant="outlined">
          <CardContent>
            <StyledTypography>
              {t(
                positive
                  ? 'component.review-detail.missing-positive'
                  : 'component.review-detail.missing-negative',
              )}
            </StyledTypography>
          </CardContent>
        </Card>
      );
    }

    const {
      owner: { firstName, lastName },
      reviewRatingId,
      title,
      text,
      created,
      dateOfVisit,
      restaurantId,
      restaurantName,
    } = data;
    const user = `${firstName} ${lastName}`;

    return (
      <StyledCard variant="outlined">
        <CardContent>
          {withRestaurantLink && (
            <Typography
              variant="h5"
              bottomGutter
              data-cy="review-detail-restaurant-link"
              component={StyledLink}
              to={getRestaurantDetail(restaurantId)}
            >
              {restaurantName}
            </Typography>
          )}
          <StyledTypographyFlex variant="subtitle2">
            <Trans
              i18nKey={
                positive
                  ? 'component.review-detail.reviewer-positive'
                  : positive === false
                  ? 'component.review-detail.reviewer-negative'
                  : 'component.review-detail.reviewer'
              }
              values={{ user }}
              components={{ strong: <StyledStrong /> }}
            />
            {positive ? <StyledThumpUp /> : positive === false ? <StyledThumpDown /> : null}
          </StyledTypographyFlex>
          <Typography variant="subtitle2" color="textSecondary">
            {formatDate(created)}
          </Typography>
          <StyledRating precision={0.5} value={reviewRatingId} readOnly />
          <StyledTypography variant="h5">{title}</StyledTypography>
          <StyledTypography variant="body2" color="textSecondary">
            <i>{`"${text}"`}</i>
          </StyledTypography>
          <StyledTypography variant="body2">
            <i>
              <Trans
                i18nKey="component.review-detail.date-of-visit"
                values={{ date: formatDate(dateOfVisit) }}
                components={{ strong: <strong /> }}
              />
            </i>
          </StyledTypography>
        </CardContent>
      </StyledCard>
    );
  }
}

export default withTranslation(I18N_CORE)(ReviewDetail);
