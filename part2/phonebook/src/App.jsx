import { useEffect, useState } from 'react';
import Form from './components/Form';
import PersonList from './components/PersonList';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleNewPersonAdded = (newPerson) => {
    if (persons.map((p) => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
  };
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons =
    filter.length < 1
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLocaleLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <Form onAddNewPerson={handleNewPersonAdded} />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
