import { useEffect, useState } from 'react';
import Form from './components/Form';
import PersonList from './components/PersonList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    PersonService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(() => {
        showNotification('Error fetching inital data', true);
      });
  }, []);

  const handleNewPersonAdded = (newPerson) => {
    const oldPerson = persons.find((p) => p.name === newPerson.name);
    if (oldPerson) {
      updatePerson(oldPerson, newPerson);
      return;
    }
    PersonService.create(newPerson)
      .then((savedPerson) => {
        setPersons(persons.concat(savedPerson));
        showNotification(`${savedPerson.name}added to phonebook`);
      })
      .catch(() => {
        showNotification(`Error adding ${newPerson.name} to database`, true);
      });
  };

  const updatePerson = (oldPerson, newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already in phonebook. Change number?`,
      )
    ) {
      PersonService.update(newPerson, oldPerson.id)
        .then((savedPerson) => {
          setPersons(
            persons.map((p) => (p.id === savedPerson.id ? savedPerson : p)),
          );
          showNotification(`${savedPerson.name}'s number updated in phonebook`);
        })
        .catch(() => {
          showNotification(
            `Error updating ${newPerson.name} in database`,
            true,
          );
        });
    }
  };

  const handleRemovePerson = (id) => {
    if (!window.confirm('are you sure you want to delete?')) {
      return;
    }
    PersonService.remove(id)
      .then((deletedPerson) => {
        setPersons(persons.filter((p) => p.id != deletedPerson.id));
        showNotification(`${deletedPerson.name} removed from phonebook`);
      })
      .catch(() => {
        showNotification(
            `Error deleting person`,
            true,
          );
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
