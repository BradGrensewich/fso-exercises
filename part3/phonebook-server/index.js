const express = require('express');
const app = express();

app.use(express.json());
let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const createId = () => {
    return Math.floor(Math.random() * 9999);
}

const PORT = 3001;
const baseUrl = `http://localhost:${PORT}`;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/info', (req, res) => {
  const html = `<div>phonebook has info for ${persons.length} people</div>
  <div>${new Date()}</div>`;
  res.send(html);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => (p.id === id));
  console.log(person);
  if (!person) {
    return res.status(404).send();
  }
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(p => p.id !== id)  
  res.status(204).send()
});

app.post('/api/persons', (req, res) => {
    const person = {...req.body, id: createId()}
    console.log(person)
    persons = persons.concat(person)
    return res.status(201).json(person)
});

app.listen(PORT, () => {
  console.log(`Server running on ${baseUrl}`);
});
