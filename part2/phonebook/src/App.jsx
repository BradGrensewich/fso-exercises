import { useState } from 'react';

const FormInput = ({ text, onChange, value }) => {
  return (
    <div>
      {text}: <input onChange={onChange} value={value} />
    </div>
  );
};

const Form = ({ onAddNewPerson }) => {
  const [newName, setNewName] = useState('');
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const [newNumber, setNewNumber] = useState('');
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    onAddNewPerson({ name: newName, number: newNumber });
    setNewName('');
    setNewNumber('');
  };

  return (
    <form>
      <div>
        <FormInput text='name' onChange={handleNameChange} value={newName} />
        <FormInput
          text='number'
          onChange={handleNumberChange}
          value={newNumber}
        />
      </div>
      <div>
        <button type='submit' onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const PersonItem = ({ person }) => {
  return (
    <li>
      {person.name} : {person.number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const handleNewPersonAdded = (newPerson) => {
    if (persons.map((p) => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
  };

  const [filter, setFilter] = useState('');
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons =
    filter.length < 1
      ? persons
      : persons.filter((p) => p.name.toLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter:
        <input type='text' value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add new</h2>
      <Form onAddNewPerson={handleNewPersonAdded} />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((p) => (
          <PersonItem key={p.name} person={p} />
        ))}
      </ul>
    </div>
  );
};

export default App;
