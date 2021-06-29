import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'core/redux/store';
import ReviewService, {
  ReviewCreateOrEditData,
  ReviewFilter,
  ReviewResponse,
} from 'services/reviewService';
import { DefaultFilter, PagedDto } from 'types/commonTypes';
import ReviewReplyService from '../../../services/reviewReplyService';
import { DEFAULT_PAGE_SIZE } from '../../../utils/constants';
import { restaurantDetailAsync } from './RestaurantDuck';

export const reviewEditAsync = createAsyncThunk(
  'reviewDuck/reviewEditAsync',
  async (data: { data: ReviewCreateOrEditData; reviewId: number }) => {
    const response = await ReviewService.edit(data.reviewId, data.data);

    return response;
  },
);

export const reviewFilterAsync = createAsyncThunk(
  'reviewDuck/reviewFilterAsync',
  async (data: DefaultFilter<ReviewFilter>) => {
    const response = await ReviewService.filter(data);

    return response;
  },
);

export const reviewDeleteAsync = createAsyncThunk(
  'reviewDuck/reviewDeleteAsync',
  async ({ restaurantId, reviewId }: { restaurantId: number; reviewId: number }, thunkAPI) => {
    await ReviewService.delete(reviewId);
    await thunkAPI.dispatch(restaurantDetailAsync(restaurantId));

    return reviewId;
  },
);

export const reviewReplyDeleteAsync = createAsyncThunk(
  'reviewDuck/reviewReplyDeleteAsync',
  async (reviewReplyId: number) => {
    await ReviewReplyService.delete(reviewReplyId);

    return reviewReplyId;
  },
);

export const getBestReviewAsync = createAsyncThunk(
  'reviewDuck/getBestReviewAsync',
  async (restaurantId: number) => {
    const response = await ReviewService.filter({
      take: 1,
      filter: {
        restaurantId,
      },
      sort: {
        predicate: 'reviewRatingId',
        reverse: true,
      },
    });

    return response;
  },
);

export const getCurrentUserReviewAsync = createAsyncThunk(
  'reviewDuck/getCurrentUserReviewAsync',
  async ({ restaurantId, ownerId }: { restaurantId: number; ownerId: number }) => {
    const response = await ReviewService.filter({
      take: 1,
      filter: {
        restaurantId,
        ownerId,
      },
      sort: {
        predicate: 'created',
        reverse: true,
      },
    });

    return response;
  },
);

export const getWorstReviewAsync = createAsyncThunk(
  'reviewDuck/getWorstReviewAsync',
  async (restaurantId: number) => {
    const response = await ReviewService.filter({
      take: 1,
      filter: {
        restaurantId,
      },
      sort: {
        predicate: 'reviewRatingId',
        reverse: false,
      },
    });

    return response;
  },
);

export const reviewCreateAsync = createAsyncThunk(
  'reviewDuck/reviewCreateAsync',
  async (data: ReviewCreateOrEditData, thunkAPI) => {
    const response = await ReviewService.create(data);
    await thunkAPI.dispatch(restaurantDetailAsync(data.restaurantId));

    return response;
  },
);

export const userLastReviewsAsync = createAsyncThunk(
  'reviewDuck/userLastReviewsAsync',
  async (userId?: number) => {
    if (!userId) {
      return {
        data: [],
        size: 0,
        status: '',
      };
    }

    const response = await ReviewService.filter({
      take: DEFAULT_PAGE_SIZE,
      sort: {
        predicate: 'created',
        reverse: true,
      },
      filter: {
        ownerId: userId,
      },
    });

    return response;
  },
);

export const getPendingReviewsAsync = createAsyncThunk(
  'reviewDuck/getPendingReviewsAsync',
  async (restaurantId: number) => {
    const response = await ReviewService.filter({
      filter: {
        restaurantId,
        hasOwnerResponse: false,
      },
      sort: {
        predicate: 'reviewRatingId',
        reverse: false,
      },
    });

    return { response, restaurantId };
  },
);

type ReviewDuckState = {
  reviewList: PagedDto<ReviewResponse>;
  userLastReviews: PagedDto<ReviewResponse>;
  bestReview?: ReviewResponse;
  currentUserReview?: ReviewResponse;
  worstReview?: ReviewResponse;
  pendingReviews: {
    [key: number]: PagedDto<ReviewResponse>;
  };
};

const initialState: ReviewDuckState = {
  reviewList: {
    data: [],
    size: 0,
    status: '',
  },
  userLastReviews: {
    data: [],
    size: 0,
    status: '',
  },
  bestReview: undefined,
  currentUserReview: undefined,
  worstReview: undefined,
  pendingReviews: {},
};

const ReviewDuck = createSlice({
  name: 'ReviewDuck',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(reviewCreateAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.reviewList.size += 1;
      state.reviewList.data.unshift(payload);
    });

    builder.addCase(reviewEditAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.reviewList.data = state.reviewList.data.map(x => {
        if (x.reviewId === payload.reviewId) {
          return payload;
        }

        return x;
      });
    });

    builder.addCase(reviewReplyDeleteAsync.fulfilled, (state, { payload: reviewReplyId }) => {
      // eslint-disable-next-line no-param-reassign
      state.reviewList.data = state.reviewList.data.map(x => {
        if (x.ownerResponse?.reviewReplyId === reviewReplyId) {
          // eslint-disable-next-line no-param-reassign
          x.ownerResponse = undefined;
        }

        return x;
      });
    });

    builder.addCase(reviewFilterAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.reviewList = payload;
    });

    builder.addCase(getBestReviewAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.bestReview = payload.size === 0 ? undefined : payload.data[0];
    });

    builder.addCase(getWorstReviewAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.worstReview = payload.size === 0 ? undefined : payload.data[0];
    });

    builder.addCase(reviewDeleteAsync.fulfilled, (state, { payload: reviewId }) => {
      // eslint-disable-next-line no-param-reassign
      state.reviewList.data = state.reviewList.data.filter(x => x.reviewId !== reviewId);
      // eslint-disable-next-line no-param-reassign
      state.reviewList.size -= 1;
    });

    builder.addCase(getPendingReviewsAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.pendingReviews[payload.restaurantId] = payload.response;
    });

    builder.addCase(userLastReviewsAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.userLastReviews = payload;
    });
  },
});

const { reducer } = ReviewDuck;

export default reducer;

export const getReviewListFromState = (state: RootState) => state.ReviewDuck.reviewList;
export const getBestReviewFromState = (state: RootState) => state.ReviewDuck.bestReview;
export const getCurrentUserReviewFromState = (state: RootState) =>
  state.ReviewDuck.currentUserReview;
export const getWorstReviewFromState = (state: RootState) => state.ReviewDuck.worstReview;
export const getUserLastReviewsFromState = (state: RootState) => state.ReviewDuck.userLastReviews;
export const getPendingReviews = (state: RootState, restaurantId: number) => {
  const reviews = state.ReviewDuck.pendingReviews;

  if (reviews[restaurantId]) {
    return reviews[restaurantId];
  }

  return {
    size: 0,
    data: [],
    status: '',
  };
};
