import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { notify } from '../utils/notificationUtil';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const visibleAnecdotes = anecdotes
    .filter((a) => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteFor(id));
    const anecdoteText = anecdotes.find((a) => a.id === id).content;
    notify(dispatch, `You voted for "${anecdoteText}"`);
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
