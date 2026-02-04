import type { Entry } from '../types';

interface EntryProps {
  entry: Entry;
}

const EntryListItem = ({ entry }: EntryProps) => {
  return (
    <li>
      <h4>{entry.date}</h4>
      <p>visibility: {entry.visibiliy}</p>
      <p>weather: {entry.weather}</p>
    </li>
  );
};

export default EntryListItem;
