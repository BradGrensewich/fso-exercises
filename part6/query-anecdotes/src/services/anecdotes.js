const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

const createNew = async (newAnecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  })

  if (!response.ok) {
    throw new Error('Failed to add anecdote')
  }
  return await response.json()
}

const voteFor = async (id) => {
  const anecdote = await fetch(`${baseUrl}/${id}`)
  const toChange = await anecdote.json()
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...toChange, votes: toChange.votes + 1 }),
  })
  if (!response.ok) {
    throw new Error('Failed to add vote')
  }
  return await response.json()
}

export default { getAll, createNew, voteFor }
