import React from 'react';
import { store } from 'core/redux/store';
import { Provider } from 'react-redux';
import AppTheme from 'core/themes/AppTheme';
import RouterWrapper from 'core/router/RouterWrapper';
import Notifications from './modules/common/components/notifications/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

/* eslint-disable react/jsx-props-no-spreading */
function App(props: any) {
  return (
    <Provider store={store}>
      <AppTheme>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <RouterWrapper {...props} />
          <Notifications />
        </MuiPickersUtilsProvider>
      </AppTheme>
    </Provider>
  );
}
/* eslint-enable react/jsx-props-no-spreading */

export default App;
