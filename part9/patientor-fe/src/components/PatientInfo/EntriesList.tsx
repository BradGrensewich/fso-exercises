import { Entry } from '../../types';
import EntriesListItem from './EntriesListItem';

interface EntriesListProps {
  entries: Entry[];
}

const EntriesList = ({ entries }: EntriesListProps) => {
  if (entries.length === 0) {
    return null;
  }  

  return (
    <div>
      <h4>Entries</h4>
      <ul>
        {entries.map((e) => (
          <EntriesListItem entry={e} key={e.id} />
        ))}
      </ul>
    </div>
  );
};

export default EntriesList;
