import { useEffect, useState } from 'react';
import { getAllEntries } from './services/entryService';
import type { Entry } from './types';
import EntryList from './components/EntryList';
import EntryForm from './components/EntryForm';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const addEntry = (savedEntry: Entry) => {
    setEntries(entries.concat(savedEntry))
  }

  return (
    <div>
      <EntryForm addEntry={addEntry} />
      <EntryList entries={entries} />
    </div>
  );
};

export default App;
