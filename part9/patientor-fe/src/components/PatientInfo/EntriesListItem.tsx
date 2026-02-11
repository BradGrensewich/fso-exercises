import { Entry } from '../../types';

interface EntriesListItemProps {
  entry: Entry;
}

const EntriesListItem = ({ entry }: EntriesListItemProps) => {
  return (
    <li>
      <p>
        {entry.date}
        <em> {entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </li>
  );
};

export default EntriesListItem;
