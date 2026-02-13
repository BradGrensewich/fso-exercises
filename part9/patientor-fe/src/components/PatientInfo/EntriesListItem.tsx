import { Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

interface EntriesListItemProps {
  entry: Entry;
}

const styles = {
  border: 'solid 2px',
  margin: '8px',
  listStyleType: 'none',
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const EntriesListItem = ({ entry }: EntriesListItemProps) => {
  const properEntry = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
      case 'Hospital':
        return <HospitalEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthCareEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  return <li style={styles}>{properEntry()}</li>;
};

export default EntriesListItem;
