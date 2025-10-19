const express = require('express');
const morgan = require('morgan')

const app = express();
app.use(express.json());

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
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
    if (!person.name || !person.number) {
        return res.status(400).json({error: 'new persons must have a name and a number'})
    }    
    if (persons.map(p => p.name).includes(person.name)) {
         return res.status(400).json({error: 'name must be unique'})
    }
    persons = persons.concat(person)
    return res.status(201).json(person)
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})