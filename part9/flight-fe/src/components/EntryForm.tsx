import { useState } from 'react';
import type { Entry } from '../types';
import { createNewEntry } from '../services/entryService';
import EntryFormInput from './EntryFormInput';
import ErrorNotification from './ErrorNotification';

interface EntryFormProps {
  addEntry: (value: Entry) => void;
}

const EntryForm = ({ addEntry }: EntryFormProps) => {
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = { weather, visibility, date, comment };
    try {
      const savedEntry = await createNewEntry(newEntry);
      addEntry(savedEntry);
    } catch (error) {
      displayError(`${error}`);
    }
  };

  const displayError = (text: string) => {
    setErrorMessage(text);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };
  return (
    <form onSubmit={submitForm}>
      <h3>Add new entry</h3>
      <ErrorNotification errorMessage={errorMessage} />
      <EntryFormInput text={'date: '} value={date} setValue={setDate} />
      <EntryFormInput
        text={'weather: '}
        value={weather}
        setValue={setWeather}
      />
      <EntryFormInput
        text={'visiblilty: '}
        value={visibility}
        setValue={setVisibility}
      />
      <EntryFormInput
        text={'comment: '}
        value={comment}
        setValue={setComment}
      />
      <button>add</button>
    </form>
  );
};

export default EntryForm;
