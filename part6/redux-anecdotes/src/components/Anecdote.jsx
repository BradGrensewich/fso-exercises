const Anecdote = ({anecdote, onVote}) => {
    return (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={onVote}>vote</button>
          </div>
        </div>
    )
}

export default Anecdote