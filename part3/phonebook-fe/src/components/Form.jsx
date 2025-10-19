import { useState } from "react";

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

export default Form