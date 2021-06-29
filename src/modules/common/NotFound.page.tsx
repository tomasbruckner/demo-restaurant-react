import React, { PureComponent } from 'react';
import PageLayout from './layouts/PageLayout';
import { WithTranslation, withTranslation } from 'react-i18next';
import { I18N_CORE } from 'core/i18n/i18n';

class NotFoundComponent extends PureComponent<WithTranslation> {
  render() {
    const { t } = this.props;

    return <PageLayout title={t('page.not-found.title')} />;
  }
}

export default withTranslation(I18N_CORE)(NotFoundComponent);
