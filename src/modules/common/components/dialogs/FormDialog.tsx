import React, { PureComponent } from 'react';
import Button from 'modules/common/components/controls/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Form from '../controls/Form';

type Props = {
  isOpen: boolean;
  onClose: (e: any) => void;
  onSubmit: (e: any) => void;
  title: string;
  submitButtonText: string;
  cancelButtonText: string;
};

export class FormDialog extends PureComponent<Props & WithTranslation> {
  onCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { onClose } = this.props;

    onClose(event);
  };

  render() {
    const {
      children,
      isOpen,
      onClose,
      onSubmit,
      submitButtonText,
      cancelButtonText,
      title,
    } = this.props;

    return (
      <MuiDialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <Form fullWidth onSubmit={onSubmit}>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.onCancel} data-cy="form-dialog-cancel">
              {cancelButtonText}
            </Button>
            <Button type="submit" variant="outlined" color="primary" form="styledFormId" data-cy="form-dialog-submit">
              {submitButtonText}
            </Button>
          </DialogActions>
        </Form>
      </MuiDialog>
    );
  }
}

export default withTranslation(I18N_CORE)(FormDialog);
