import { useAppSelector } from '../../hooks';
import { Entry } from '../../types';

interface EntriesListItemProps {
  entry: Entry;
}

const EntriesListItem = ({ entry }: EntriesListItemProps) => {
  const diagnoses = useAppSelector((state) => state.diagnoses);
  return (
    <li>
      <p>
        {entry.date}
        <em> {entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>
            {c} {diagnoses.find((d) => d.code === c)?.name}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default EntriesListItem;
