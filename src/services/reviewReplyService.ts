import CoreService from './CoreService';

export type ReviewReplyResponse = {
  reviewReplyId: number;
  reviewId: number;
  creatorId: number;
  created: string;
  updated: string;
  text: string;
};

export type ReviewReplyCreateData = {
  reviewId: number;
  text: string;
};

export type ReviewReplyEditData = {
  text: string;
};

class ReviewReplyService {
  static async create(data: ReviewReplyCreateData): Promise<ReviewReplyResponse> {
    const response = await CoreService.post({
      url: '/api/v1/review-replies',
      authorization: true,
      data,
    });

    return response.data;
  }

  static async delete(reviewReplyId: number): Promise<void> {
    await CoreService.delete({
      url: `/api/v1/review-replies/${reviewReplyId}`,
      authorization: true,
    });
  }

  static async edit(
    reviewReplyId: number,
    data: ReviewReplyEditData,
  ): Promise<ReviewReplyResponse> {
    const response = await CoreService.put({
      url: `/api/v1/review-replies/${reviewReplyId}`,
      authorization: true,
      data,
    });

    return response.data;
  }
}

export default ReviewReplyService;
