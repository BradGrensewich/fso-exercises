import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload;
      const toChange = state.find((a) => a.id === id);
      const changed = { ...toChange, votes: toChange.votes + 1 };
      return state.map((a) => (a.id === id ? changed : a));
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

const {setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { voteForAnecdote, createAnecdote} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
