import { createSlice } from '@reduxjs/toolkit';
import { displayError } from './notificationReducer';
import userService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch {
      dispatch(displayError('Error fetching users info from server'));
    }
  };
};

export default usersSlice.reducer;
