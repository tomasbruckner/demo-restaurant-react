import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'core/redux/store';

type State = {
  notification?: {
    message: string;
    variant: 'success' | 'error';
  };
};

const initialState: State = {
  notification: undefined,
};

const NotificationDuck = createSlice({
  name: 'NotificationDuck',
  initialState,
  reducers: {
    removeNotification: state => {
      // eslint-disable-next-line no-param-reassign
      state.notification = undefined;
    },
    setErrorNotification: (state, { payload: { message } }: PayloadAction<{ message: string }>) => {
      // eslint-disable-next-line no-param-reassign
      state.notification = {
        message,
        variant: 'error',
      };
    },
    setSuccessNotification: (
      state,
      { payload: { message } }: PayloadAction<{ message: string }>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.notification = {
        message,
        variant: 'success',
      };
    },
  },
});

const { actions, reducer } = NotificationDuck;

export const { removeNotification, setErrorNotification, setSuccessNotification } = actions;
export default reducer;

export const getNotificationSelector = (state: RootState) => state.NotificationDuck.notification;
