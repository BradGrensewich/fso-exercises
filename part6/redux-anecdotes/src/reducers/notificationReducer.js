import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    },
  },
});

const {setNotification, removeNotification} = notificationSlice.actions

export const notify = (message, time = 3000) => {
  return async(dispatch) => {
     dispatch(setNotification(message));
      setTimeout(() => {
        dispatch(removeNotification());
      }, time);
  }
}
export default notificationSlice.reducer
