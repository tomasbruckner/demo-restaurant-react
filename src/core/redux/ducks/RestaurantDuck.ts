import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'core/redux/store';
import RestaurantService, {
  RestaurantCreateOrEditData,
  RestaurantFilter,
  RestaurantResponse,
} from 'services/restaurantService';
import { DefaultFilter, PagedDto } from 'types/commonTypes';

export const restaurantDetailAsync = createAsyncThunk(
  'restaurantDuck/restaurantDetailAsync',
  async (restaurantId: number) => {
    const response = await RestaurantService.getById(restaurantId);

    return response;
  },
);

export const restaurantEditAsync = createAsyncThunk(
  'restaurantDuck/restaurantEditAsync',
  async (data: { data: RestaurantCreateOrEditData; restaurantId: number }) => {
    const response = await RestaurantService.edit(data.restaurantId, data.data);

    return response;
  },
);

export const restaurantFilterAsync = createAsyncThunk(
  'restaurantDuck/restaurantFilterAsync',
  async (data: DefaultFilter<RestaurantFilter>) => {
    const response = await RestaurantService.filter(data);

    return response;
  },
);

export const ownedRestaurantFilterAsync = createAsyncThunk(
  'restaurantDuck/ownedRestaurantFilterAsync',
  async (filter: DefaultFilter<RestaurantFilter>) => {
    const response = await RestaurantService.filter(filter);

    return response;
  },
);

export const restaurantCreateAsync = createAsyncThunk(
  'restaurantDuck/restaurantCreateAsync',
  async (data: RestaurantCreateOrEditData) => {
    const response = await RestaurantService.create(data);

    return response;
  },
);

type RestaurantDuckState = {
  restaurant?: RestaurantResponse;
  restaurantList: PagedDto<RestaurantResponse>;
  ownedRestaurantList: PagedDto<RestaurantResponse>;
};

const initialState: RestaurantDuckState = {
  restaurant: undefined,
  restaurantList: {
    data: [],
    size: 0,
    status: '',
  },
  ownedRestaurantList: {
    data: [],
    size: 0,
    status: '',
  },
};

const RestaurantDuck = createSlice({
  name: 'RestaurantDuck',
  initialState,
  reducers: {
    setRestaurant: (state, { payload }: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.restaurant = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(restaurantCreateAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.restaurant = payload;
    });

    builder.addCase(restaurantEditAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.restaurant = payload;
    });

    builder.addCase(restaurantDetailAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.restaurant = payload;
    });

    builder.addCase(restaurantFilterAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.restaurantList = payload;
    });

    builder.addCase(ownedRestaurantFilterAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.ownedRestaurantList = payload;
    });
  },
});

const { actions, reducer } = RestaurantDuck;

export const { setRestaurant } = actions;
export default reducer;

export const getRestaurantFromState = (state: RootState) => state.RestaurantDuck.restaurant;
export const getRestaurantListFromState = (state: RootState) => state.RestaurantDuck.restaurantList;
export const getOwnedRestaurantListFromState = (state: RootState) =>
  state.RestaurantDuck.ownedRestaurantList;
