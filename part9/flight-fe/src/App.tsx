import { useEffect, useState } from 'react';
import {getAll} from './services/entryService';
import type { Entry } from './types';
import EntryList from './components/EntryList';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    getAll().then((data) => {
      setEntries(data);
    });
  }, []);

  return (
    <div>
      <EntryList entries={entries} />
    </div>
  );
};

export default App;
