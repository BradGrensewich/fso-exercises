import type { Entry } from '../types';
import EntryListItem from './EntryListItem';

interface EntriesProps {
    entries: Entry[];
}

const Entries = ({entries}: EntriesProps) => {
  return (
    <div>
      <h3>Diary Entries</h3>
      <ul>
        {entries.map((e) => (
          <EntryListItem entry={e} key={e.id} />
        ))}
      </ul>
    </div>
  );
};

export default Entries;
