import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const visibleAnecdotes = anecdotes
    .filter((a) => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {visibleAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onVote={() => vote(anecdote.id)}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
