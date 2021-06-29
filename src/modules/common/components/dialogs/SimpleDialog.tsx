import React, { PureComponent } from 'react';
import Button from 'modules/common/components/controls/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  onClose: (e: any) => void;
  onSubmit: (e: any) => void;
  title: string;
  text: string;
  submitButtonText?: string;
  cancelButtonText?: string;
};

export class SimpleDialog extends PureComponent<Props & WithTranslation> {
  render() {
    const {
      isOpen,
      onClose,
      onSubmit,
      t,
      submitButtonText = t('component.simple-dialog.confirm'),
      cancelButtonText = t('component.simple-dialog.cancel'),
      text,
      title,
    } = this.props;

    return (
      <MuiDialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{cancelButtonText}</Button>
          <Button onClick={onSubmit} color="primary" autoFocus>
            {submitButtonText}
          </Button>
        </DialogActions>
      </MuiDialog>
    );
  }
}

export default withTranslation(I18N_CORE)(SimpleDialog);
