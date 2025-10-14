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

const PersonItem = ({person}) => {
  return (
    <li>{person.name} : {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: 123456775 }]);
  const handleNewPersonAdded = (newPerson) => {
    if (persons.map((p) => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form onAddNewPerson={handleNewPersonAdded} />
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => (
         <PersonItem key={p.name} person={p} />
        ))}
      </ul>
    </div>
  );
};

export default App;
