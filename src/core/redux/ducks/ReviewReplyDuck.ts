import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ReviewReplyService, {
  ReviewReplyCreateData,
  ReviewReplyEditData,
} from 'services/reviewReplyService';

export const reviewReplyEditAsync = createAsyncThunk(
  'reviewDuck/reviewReplyEditAsync',
  async (data: { data: ReviewReplyEditData; reviewReplyId: number }) => {
    const response = await ReviewReplyService.edit(data.reviewReplyId, data.data);

    return response;
  },
);

export const reviewReplyCreateAsync = createAsyncThunk(
  'reviewDuck/reviewReplyCreateAsync',
  async (data: ReviewReplyCreateData) => {
    const response = await ReviewReplyService.create(data);

    return response;
  },
);

type ReviewReplyDuckState = {};

const initialState: ReviewReplyDuckState = {};

const ReviewReplyDuck = createSlice({
  name: 'ReviewReplyDuck',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(reviewReplyCreateAsync.fulfilled, () => {});

    builder.addCase(reviewReplyEditAsync.fulfilled, () => {});
  },
});

const { reducer } = ReviewReplyDuck;

export default reducer;
