import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import NotificationContext from '../notificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const addAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SET',
        payload: `Error: ${error.message}"`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000)
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'SET',
      payload: `Added new anecdote: "${content}"`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
