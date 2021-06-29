import { AppTheme } from 'utils/constants';
import { green } from '@material-ui/core/colors';

const DEFAULT_THEME = {
  accent: '#4c94d1',
  formInput: '#b8b8b8',
  borderDark: '#dbdbdb',
  borderLight: '#ebebeb',
  borderRadius: '3px',
  buttonGreenColor: green[500],
  diffAdded: '#66bb6a',
  diffDeleted: '#f44336',
  diffUpdated: '#ffb300',
  iconButtonColor: '#757575',
  iconButtonColorDisabled: '#dddddd',
  primary: '#146cb7',
  secondary: '#f44336',
  errorText: '#f44336',
  warningText: '#fdd835',
  textPrimary: '#000000',
  textSecondary: '#696969',
  textInputLabel: 'rgba(0,0,0,0.54)',
  fontSize: '14px',
  white: '#ffffff',
};

export default {
  [AppTheme.default]: DEFAULT_THEME,
};
