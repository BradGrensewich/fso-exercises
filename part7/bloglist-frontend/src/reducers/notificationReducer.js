import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

export const displayNotification = (message, time = 3000) => {
  return (dispatch) => {
    dispatch(setNotification({message}));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};
export const displayError = (message, time = 3000) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError: true }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
