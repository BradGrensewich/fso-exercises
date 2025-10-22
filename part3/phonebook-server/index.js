require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const html = `<div>phonebook has info for ${persons.length} people</div>
  <div>${new Date()}</div>`;
      res.send(html);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).send();
      } else {
        return res.json(person);
      }
    })
    .catch((error) => next(error));  
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      return res.status(204).send();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: 'new persons must have a name and a number' });
  }
  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => {
      return res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findById(req.params.id).then((person) => {
    person.name = name;
    person.number = number;
    person
      .save()
      .then((updatedPerson) => {
        return res.json(updatedPerson);
      })
      .catch((error) => next(error));
  });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }  else if (error.name === 'ValidationError') {    
  return res.status(400).json({ error: error.message })  
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
