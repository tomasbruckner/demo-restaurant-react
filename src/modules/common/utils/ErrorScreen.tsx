import React, { PureComponent } from 'react';
import PageLayout from '../layouts/PageLayout';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';

export class ErrorScreen extends PureComponent<{ title: string } & WithTranslation> {
  render() {
    const { t } = this.props;

    return <PageLayout title={t('page.error.title')} />;
  }
}

export default withTranslation(I18N_CORE)(ErrorScreen);
