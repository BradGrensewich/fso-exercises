import { useState } from 'react';
import type { Entry } from '../types';
import { createNewEntry } from '../services/entryService';
import EntryFormInput from './EntryFormInput';

interface EntryFormProps {
  addEntry: (value: Entry) => void;
}

const EntryForm = ({ addEntry }: EntryFormProps) => {
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = { weather, visibility, date, comment };
    const savedEntry = await createNewEntry(newEntry);
    addEntry(savedEntry);
  };
  return (
    <form onSubmit={submitForm}>
      <h3>Add new entry</h3>
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
