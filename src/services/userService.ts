import CoreService from './CoreService';
import { DefaultFilter, PagedDto } from '../types/commonTypes';

export type UserResponse = {
  userId: number;
  roleId: number;
  firstName: string;
  lastName: string;
  email: string;
  created: string;
  imageLink?: string;
};

export type UserSimpleResponse = {
  userId: number;
  firstName: string;
  lastName: string;
  imageLink?: string;
};

export type UserEditData = {
  roleId: number;
  firstName: string;
  lastName: string;
};

export type UserFilter = {
  roleIdList?: number[];
  firstName?: string;
  lastName?: string;
  email?: string;
};

class UserService {
  static async me(): Promise<UserResponse> {
    const response = await CoreService.get({
      url: '/api/v1/users/me',
      authorization: true,
    });

    return response.data;
  }

  static async filter(filter: DefaultFilter<UserFilter>): Promise<PagedDto<UserResponse>> {
    const response = await CoreService.post({
      url: '/api/v1/users/filter',
      authorization: true,
      data: filter,
    });

    return response.data;
  }

  static async deleteUser(userId: number): Promise<void> {
    await CoreService.delete({
      url: `/api/v1/users/${userId}`,
      authorization: true,
    });
  }

  static async editUser(userId: number, data: UserEditData): Promise<void> {
    await CoreService.put({
      url: `/api/v1/users/${userId}`,
      authorization: true,
      data,
    });
  }
}

export default UserService;
