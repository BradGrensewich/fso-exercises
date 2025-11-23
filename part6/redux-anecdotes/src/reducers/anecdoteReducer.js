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
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

const {setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { voteForAnecdote} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
