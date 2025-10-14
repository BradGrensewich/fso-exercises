import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObj = { name: newName };
    setPersons(persons.concat(personObj));
    setNewName('');
  };
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type='submit' onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => <li key={p.name}>{p.name}</li>)}
      </ul>
    </div>
  );
};

export default App;
