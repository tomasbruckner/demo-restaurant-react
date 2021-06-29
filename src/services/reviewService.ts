import CoreService from './CoreService';
import { DefaultFilter, PagedDto } from '../types/commonTypes';
import { ReviewReplyResponse } from './reviewReplyService';
import { UserSimpleResponse } from './userService';

export type ReviewResponse = {
  reviewId: number;
  reviewRatingId: number;
  restaurantId: number;
  title: string;
  text: string;
  dateOfVisit: string;
  hasOwnerResponse: boolean;
  created: string;
  owner: UserSimpleResponse;
  ownerResponse?: ReviewReplyResponse;
  restaurantName: string;
};

export type ReviewFilter = {
  reviewRatingId?: number;
  restaurantId?: number;
  ownerId?: number;
  title?: string;
  text?: string;
  dateOfVisit?: string;
  hasOwnerResponse?: boolean;
  created?: string;
  restaurantName?: string;
};

export type ReviewCreateOrEditData = {
  reviewRatingId: number;
  restaurantId: number;
  title: string;
  text: string;
  dateOfVisit: string;
};

class ReviewService {
  static async create(data: ReviewCreateOrEditData): Promise<ReviewResponse> {
    const response = await CoreService.post({
      url: '/api/v1/reviews',
      authorization: true,
      data,
    });

    return response.data;
  }

  static async filter(data: DefaultFilter<ReviewFilter>): Promise<PagedDto<ReviewResponse>> {
    const response = await CoreService.post({
      url: '/api/v1/reviews/filter',
      authorization: true,
      data,
    });

    return response.data;
  }

  static async delete(reviewId: number): Promise<void> {
    await CoreService.delete({
      url: `/api/v1/reviews/${reviewId}`,
      authorization: true,
    });
  }

  static async edit(reviewId: number, data: ReviewCreateOrEditData): Promise<ReviewResponse> {
    const response = await CoreService.put({
      url: `/api/v1/reviews/${reviewId}`,
      authorization: true,
      data,
    });

    return response.data;
  }
}

export default ReviewService;
