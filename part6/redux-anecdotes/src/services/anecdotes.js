const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch initial data');
  }
  return await response.json();
};

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  });
  if (!response.ok) {
    throw new Error('Failed to add new anecdote');
  }
  return await response.json();
};

const voteFor = async (id) => {
  const original = await fetch(`${baseUrl}/${id}`);
  if (!original.ok) {
    throw new Error('Failed to fetch original anecdote');
  }
  const toChange = await original.json()
  const toUpdate = { ...toChange, votes: toChange.votes + 1 };
  const updated = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toUpdate),
  });

  if (!updated.ok) {
    throw new Error('Failed to update anecdote');
  }

  return await updated.json();
};

export default { getAll, createNew, voteFor };
