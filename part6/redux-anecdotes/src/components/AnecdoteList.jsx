import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
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
