import { useEffect, useState } from 'react';
import Form from './components/Form';
import PersonList from './components/PersonList';
import Filter from './components/Filter';
import PersonService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    PersonService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(() => {
        alert('Issue fetching persons');
      });
  }, []);

  const handleNewPersonAdded = (newPerson) => {
    if (persons.map((p) => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    PersonService.create(newPerson)
      .then((p) => {
        setPersons(persons.concat(p));
      })
      .catch(() => {
        alert('error adding new person');
      });
  };

  const handleRemovePerson = (id) => {
    if (!window.confirm('are you sure you want to delete?')) {
      return;
    }
    PersonService.remove(id)
      .then((res) => {
        setPersons(persons.filter((p) => p.id != res.id));
      })
      .catch(() => {
        alert('Error removing person');
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <Form onAddNewPerson={handleNewPersonAdded} />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        filter={filter}
        onRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
