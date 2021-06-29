import React, { PureComponent } from 'react';
import DropZone from 'react-dropzone';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../controls/Button';
import { Typography, withStyles } from '@material-ui/core';

const DropZoneContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  cursor: pointer;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${p => p.theme.textSecondary};
`;

type Props = {
  onSubmit?: (file: File) => void;
  onClose?: () => void;
  isOpen: boolean;
};

type State = {
  file?: File;
};

const StyledTypography = withStyles({
  root: {
    color: 'green',
  },
})(Typography);

const StyledIcon = withStyles({
  root: { marginRight: '8px' },
})(CloudUploadIcon);

export class FileUploadDialog extends PureComponent<Props & WithTranslation, State> {
  state: State = {};

  onDrop = (files: File[]) => {
    this.setState({ file: files[0] });
  };

  onClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }

    this.setState({ file: undefined });
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { file } = this.state;

    if (onSubmit && file) {
      onSubmit(file);
    }

    this.setState({ file: undefined });
  };

  render() {
    const { t, isOpen } = this.props;
    const { file } = this.state;

    return (
      <div>
        <MuiDialog open={isOpen} onClose={this.onClose} maxWidth="lg" fullWidth>
          <DialogTitle>{t('component.file-upload.title')}</DialogTitle>
          <DropZone multiple={false} onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <DropZoneContent {...getRootProps()}>
                <input {...getInputProps()} />
                {file ? (
                  <StyledTypography variant="h5">
                    {t('component.file-upload.text-added')}
                  </StyledTypography>
                ) : (
                  <>
                    <StyledIcon color="action" fontSize="large" />
                    <Typography variant="h5" color="textSecondary">
                      {t('component.file-upload.text')}
                    </Typography>
                  </>
                )}
              </DropZoneContent>
            )}
          </DropZone>
          <DialogActions>
            <Button onClick={this.onClose} variant="outlined">
              {t('component.file-upload.cancel')}
            </Button>
            <Button
              onClick={this.onSubmit}
              type="submit"
              variant="outlined"
              color="primary"
              form="styledFormId"
            >
              {t('component.file-upload.submit')}
            </Button>
          </DialogActions>
        </MuiDialog>
      </div>
    );
  }
}

export default withTranslation(I18N_CORE)(FileUploadDialog);
