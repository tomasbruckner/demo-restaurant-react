import React, { PureComponent } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components/macro';
import FileUploadDialog from 'modules/common/components/file-upload/FileUploadDialog';
import ImageService from 'services/imageService';
import { connect, ConnectedProps } from 'react-redux';
import { userInfoAsync } from 'core/redux/ducks/UserDuck';
import { API_ENDPOINT } from 'config/config';

const StyledAvatar = withStyles({
  root: {
    height: '100%',
    width: '100%',
    marginBottom: '32px',
    cursor: 'pointer',
  },
})(Avatar);

const StyledAccountCircle = withStyles({
  root: {
    height: '100%',
    width: '100%',
  },
})(AccountCircle);

const StyledWrapper = styled.div`
  max-height: 150px;
  max-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const connector = connect(null, {
  dispatchGetMe: userInfoAsync,
});

type Props = {
  imageLink?: string;
};

export class UserProfileImage extends PureComponent<Props & ConnectedProps<typeof connector>> {
  state = {
    isUploadDialogOpen: false,
  };

  onToggleUploadDialog = () => {
    const { isUploadDialogOpen } = this.state;

    this.setState({ isUploadDialogOpen: !isUploadDialogOpen });
  };

  onUploadFile = async (file: File) => {
    const { dispatchGetMe } = this.props;
    const formData = new FormData();
    formData.append('file', file);

    this.onToggleUploadDialog();
    await ImageService.uploadUserProfileImage(formData);
    dispatchGetMe();
  };

  render() {
    const { isUploadDialogOpen } = this.state;
    const { imageLink } = this.props;

    return (
      <StyledWrapper>
        <StyledAvatar
          src={`${API_ENDPOINT}${imageLink}`}
          onClick={this.onToggleUploadDialog}
          style={{ height: '100%' }}
        >
          <StyledAccountCircle />
        </StyledAvatar>
        <FileUploadDialog
          onSubmit={this.onUploadFile}
          isOpen={isUploadDialogOpen}
          onClose={this.onToggleUploadDialog}
        />
      </StyledWrapper>
    );
  }
}

export default connector(UserProfileImage);
