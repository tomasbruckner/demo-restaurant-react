import React, { PureComponent } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components/macro';
import { API_ENDPOINT } from 'config/config';

const StyledAvatar = withStyles({
  root: {
    height: '100%',
    width: '100%',
    marginBottom: '32px',
  },
})(Avatar);

const StyledAccountCircle = withStyles({
  root: {
    height: '100%',
    width: '100%',
  },
})(AccountCircle);

const StyledWrapper = styled.div`
  max-height: 100px;
  max-width: 100px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  imageLink?: string;
};

export class UserProfileImage extends PureComponent<Props> {
  render() {
    const { imageLink } = this.props;

    return (
      <StyledWrapper>
        <StyledAvatar src={imageLink ? `${API_ENDPOINT}${imageLink}` : undefined}>
          <StyledAccountCircle />
        </StyledAvatar>
      </StyledWrapper>
    );
  }
}

export default UserProfileImage;
