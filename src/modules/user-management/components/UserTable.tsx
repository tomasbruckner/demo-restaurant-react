import React, { PureComponent } from 'react';
import MaterialTable from 'material-table';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Role } from 'utils/constants';
import { tableIcons } from './TableIcons';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import { userListSelector, userFilterAsync } from 'core/redux/ducks/UserDuck';
import UserService from 'services/userService';

const connector = connect(
  (state: RootState) => {
    return {
      userList: userListSelector(state),
    };
  },
  {
    fetchUsers: userFilterAsync,
  },
);

export class UserTable extends PureComponent<WithTranslation & ConnectedProps<typeof connector>> {
  render() {
    const { t } = this.props;

    return (
      <>
        <MaterialTable
          // @ts-ignore
          icons={tableIcons}
          columns={[
            {
              title: '',
              field: 'userId',
              hidden: true,
            },
            {
              title: t('page.user-management.table.columns.last-name'),
              field: 'lastName',
            },
            {
              title: t('page.user-management.table.columns.first-name'),
              field: 'firstName',
            },
            {
              title: t('page.user-management.table.columns.email'),
              field: 'email',
              editable: 'never',
            },
            {
              title: t('page.user-management.table.columns.role'),
              field: 'roleId',
              lookup: {
                [Role.User]: t('enum.role.user'),
                [Role.Owner]: t('enum.role.owner'),
                [Role.Admin]: t('enum.role.admin'),
              },
            },
          ]}
          data={async query => {
            const filters = query.filters.reduce(
              (acc, x) => {
                const key = x.column.field as 'email' | 'lastName' | 'firstName' | 'roleId';
                acc[key] = x.value;

                return acc;
              },
              {
                email: undefined,
                lastName: undefined,
                firstName: undefined,
                roleId: undefined,
              },
            );
            const response = await UserService.filter({
              sort: {
                predicate: query.orderBy?.field?.toString() || 'lastName',
                reverse: query.orderDirection === 'desc',
              },
              take: query.pageSize,
              skip: query.page * query.pageSize,
              filter: {
                email: filters.email,
                firstName: filters.firstName,
                lastName: filters.lastName,
                roleIdList: filters.roleId,
              },
            });
            return {
              data: response.data,
              page: query.page,
              totalCount: response.size,
            };
          }}
          options={{
            search: false,
            showTitle: false,
            draggable: false,
            filtering: true,
            pageSize: 10,
          }}
          editable={{
            onRowUpdate: async ({ userId, roleId, firstName, lastName }) => {
              await UserService.editUser(userId, {
                roleId,
                firstName,
                lastName,
              });
            },
            onRowDelete: async ({ userId }) => {
              await UserService.deleteUser(userId);
            },
          }}
        />
      </>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(UserTable));
