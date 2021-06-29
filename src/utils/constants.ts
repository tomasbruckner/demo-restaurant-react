// eslint-disable-next-line import/prefer-default-export
export const AppTheme = {
  default: (Symbol('defaultAppTheme') as unknown) as string,
};

export const Role = {
  Admin: 1,
  Owner: 2,
  User: 3,
};

export const AllRoles = [Role.Admin, Role.Owner, Role.User];
export const AdminOrOwner = [Role.Admin, Role.Owner];
export const OnlyAdmin = [Role.Admin];
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_SEARCH_PAGE_SIZE = 10;
