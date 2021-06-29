import CoreService from './CoreService';
import { DefaultFilter, PagedDto } from '../types/commonTypes';

export type RestaurantResponse = {
  restaurantId: number;
  ownerId: number;
  name: string;
  description: string;
  websiteUrl: string;
  contactPhone: string;
  address: string;
  numberOfReviews: number;
  averageRating: number;
  hasCurrentUserReviewed?: boolean;
  imageLink: string;
};

export type RestaurantFilter = {
  ownerId?: number;
  name?: string;
  description?: string;
  websiteUrl?: string;
  contactPhone?: string;
  address?: string;
  averageRating?: number | null;
};

export type RestaurantCreateOrEditData = {
  name: string;
  description: string;
  websiteUrl: string;
  contactPhone: string;
  address: string;
};

class RestaurantService {
  static async getById(restaurantId: number): Promise<RestaurantResponse> {
    const response = await CoreService.get({
      url: `/api/v1/restaurants/${restaurantId}`,
      authorization: true,
    });

    return response.data;
  }

  static async create(data: RestaurantCreateOrEditData): Promise<RestaurantResponse> {
    const response = await CoreService.post({
      url: '/api/v1/restaurants',
      authorization: true,
      data,
    });

    return response.data;
  }

  static async filter(
    data: DefaultFilter<RestaurantFilter>,
  ): Promise<PagedDto<RestaurantResponse>> {
    const response = await CoreService.post({
      url: '/api/v1/restaurants/filter',
      authorization: true,
      data,
    });

    return response.data;
  }

  static async delete(restaurantId: number): Promise<void> {
    await CoreService.delete({
      url: `/api/v1/restaurants/${restaurantId}`,
      authorization: true,
    });
  }

  static async edit(
    restaurantId: number,
    data: RestaurantCreateOrEditData,
  ): Promise<RestaurantResponse> {
    const response = await CoreService.put({
      url: `/api/v1/restaurants/${restaurantId}`,
      authorization: true,
      data,
    });

    return response.data;
  }
}

export default RestaurantService;
