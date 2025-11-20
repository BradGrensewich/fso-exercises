import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((a) => a.content.includes(filter))
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map((anecdote) => (
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
