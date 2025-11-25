import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import NotificationContext from './notificationContext'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: anecdoteService.voteFor,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updated.id ? updated : a)),
      )
    },
  })
  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id)
    notificationDispatch({
      type: 'SET',
      payload: `Vote added for "${anecdote.content}"`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
