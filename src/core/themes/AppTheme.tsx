import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from './muiTheme';
import theme from './theme';
import { AppTheme } from 'utils/constants';

export class AppThemeComponent extends PureComponent<{}> {
  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider theme={muiTheme[AppTheme.default]}>
        <ThemeProvider theme={theme[AppTheme.default]}>
          <>{children}</>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

export default AppThemeComponent;
