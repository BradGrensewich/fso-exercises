import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

export const notify = (dispatch, message, time = 2000) => {
  dispatch(setNotification(message));
  setTimeout(() => {
    dispatch(removeNotification());
  }, time);
};
