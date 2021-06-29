import React, { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import Logger from 'utils/logger';
import { I18N_CORE } from 'core/i18n/i18n';
import ErrorScreen from './ErrorScreen';

export class ErrorBoundaryComp extends PureComponent<
  { renderProp?: () => React.ReactNode } & WithTranslation
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    Logger.error(error, errorInfo);
  }

  render() {
    const { children, renderProp, t } = this.props;
    const { error } = this.state;

    if (!error) {
      return children;
    }

    if (renderProp) {
      return renderProp();
    }

    return <ErrorScreen title={t('CommonComponents.ErrorBoundary.error')} />;
  }
}

export default withTranslation(I18N_CORE)(ErrorBoundaryComp);
