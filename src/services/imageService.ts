import CoreService from './CoreService';

class ImageService {
  static async uploadUserProfileImage(data: FormData): Promise<void> {
    await CoreService.post({
      url: '/api/v1/images/user-profile',
      authorization: true,
      data,
    });
  }

  static async uploadRestaurantImage(data: {
    data: FormData;
    restaurantId: number;
  }): Promise<void> {
    await CoreService.post({
      url: `/api/v1/images/restaurant/${data.restaurantId}`,
      authorization: true,
      data: data.data,
    });
  }
}

export default ImageService;
