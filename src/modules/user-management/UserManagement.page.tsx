import React, { PureComponent } from 'react';
import PageLayout from '../common/layouts/PageLayout';
import UserTable from './components/UserTable';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';

class UserManagementComponent extends PureComponent<WithTranslation> {
  render() {
    const { t } = this.props;

    return (
      <PageLayout title={t('page.user-management.title')}>
        <UserTable />
      </PageLayout>
    );
  }
}

export default withTranslation(I18N_CORE)(UserManagementComponent);
