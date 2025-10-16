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
    const oldPerson = persons.find((p) => p.name === newPerson.name);
    if (oldPerson) {
      updatePerson(oldPerson, newPerson);
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

  const updatePerson = (oldPerson, newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already in phonebook. Change number?`,
      )
    ) {
      PersonService.update(newPerson, oldPerson.id).then((savedPerson) => {
        setPersons(
          persons.map((p) => (p.id === savedPerson.id ? savedPerson : p)),
        );
      });
    }
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
