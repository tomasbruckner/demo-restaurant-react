import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'core/redux/store';
import AuthService, { LoginData, SignUpData } from 'services/authService';
import UserService, { UserFilter, UserResponse } from 'services/userService';
import StorageService from 'services/storageService';
import { setErrorNotification } from 'core/redux/ducks/NotificationDuck';
import { DefaultFilter } from 'types/commonTypes';
import i18n from 'core/i18n/i18n';

export const userInfoAsync = createAsyncThunk('userDuck/userInfoAsync', async () => {
  const response = await UserService.me();

  return response;
});

export const userFilterAsync = createAsyncThunk(
  'userDuck/userFilterAsync',
  async (filter: DefaultFilter<UserFilter>) => {
    const response = await UserService.filter(filter);

    return response;
  },
);

export const loginUserAsync = createAsyncThunk(
  'userDuck/loginUserAsync',
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await AuthService.login(data);
      StorageService.setToken(response.accessToken);
      await thunkAPI.dispatch(userInfoAsync());

      return response;
    } catch (err) {
      thunkAPI.dispatch(setErrorNotification({ message: i18n.t('page.login.errors.login') }));
      return thunkAPI.rejectWithValue(err.response);
    }
  },
);

export const signUpUserAsync = createAsyncThunk(
  'userDuck/signUpUserAsync',
  async (data: SignUpData, thunkAPI) => {
    try {
      const response = await AuthService.signUp(data);
      StorageService.setToken(response.accessToken);
      await thunkAPI.dispatch(userInfoAsync());

      return response;
    } catch (err) {
      thunkAPI.dispatch(
        setErrorNotification({ message: i18n.t('page.sign-up.errors.email-exists') }),
      );
      return thunkAPI.rejectWithValue(err.response);
    }
  },
);

type UserDuckState = {
  user?: UserResponse;
  userList: UserResponse[];
};

const initialState: UserDuckState = {
  user: undefined,
  userList: [],
};

const UserDuck = createSlice({
  name: 'UserDuck',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.user = payload;
    },
    logOut: state => {
      StorageService.setToken('');
      // eslint-disable-next-line no-param-reassign
      state.user = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(userInfoAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.user = payload;
    });

    builder.addCase(userInfoAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.user = undefined;
      StorageService.setToken('');
    });

    builder.addCase(userFilterAsync.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.userList = payload.data;
    });
  },
});

const { actions, reducer } = UserDuck;

export const { logOut, setUser } = actions;
export default reducer;

export const getUserFromState = (state: RootState) => state.UserDuck.user;
export const getUserListFromState = (state: RootState) => state.UserDuck.userList;

export const isUserLoggedSelector = createSelector([getUserFromState], user => !!user);

// material-table modifies input data, but redux toolkit freezes it, so we need to make the data editable
// https://github.com/mbrn/material-table/issues/1979
export const userListSelector = createSelector([getUserListFromState], userList =>
  userList.map(x => ({ ...x })),
);
