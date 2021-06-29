import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'core/redux/store';
import { DefaultFilter, PagedDto } from 'types/commonTypes';
import RestaurantService, {
  RestaurantFilter,
  RestaurantResponse,
} from 'services/restaurantService';

export const searchResultFilterAsync = createAsyncThunk(
  'searchDuck/searchResultFilterAsync',
  async (filter: DefaultFilter<RestaurantFilter>) => {
    const response = await RestaurantService.filter(filter);

    return response;
  },
);

type State = {
  searchResult: PagedDto<RestaurantResponse>;
};

const initialState: State = {
  searchResult: {
    size: 0,
    status: '',
    data: [],
  },
};

const SearchDuck = createSlice({
  name: 'SearchDuck',
  initialState,
  reducers: {
    clearSearch: state => {
      // eslint-disable-next-line no-param-reassign
      state.searchResult = {
        size: 0,
        status: '',
        data: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(searchResultFilterAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.searchResult = payload;
    });
  },
});

const { actions, reducer } = SearchDuck;

export const { clearSearch } = actions;
export default reducer;

export const getSearchSelector = (state: RootState) => state.SearchDuck.searchResult;
