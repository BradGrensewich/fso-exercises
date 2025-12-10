import { createSlice } from '@reduxjs/toolkit';
import { displayNotification, displayError } from './notificationReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(displayNotification(`${user.username} logged in`));
    } catch (error) {
      dispatch(displayError(error.message));
    }
  };
};

export const logInFromStorage = () => {
  return (dispatch) => {
    const loggedInUser = window.localStorage.getItem('user');
    if (loggedInUser) {
      const existingUser = JSON.parse(loggedInUser);
      dispatch(setUser(existingUser));
      blogService.setToken(existingUser.token);
      dispatch(displayNotification(`${existingUser.username} logged in`));
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.clear();
    dispatch(displayNotification('User logged out'));
  };
};

export default userSlice.reducer;
