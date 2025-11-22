import { useEffect } from 'react';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const initialAnecdotes = await anecdoteService.getAll();
      dispatch(setAnecdotes(initialAnecdotes));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
