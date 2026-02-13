import { useAppSelector } from '../../hooks';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Favorite } from '@mui/icons-material';
import { HealthCheckEntry as Entry } from '../../types';

interface EntriesListItemProps {
  entry: Entry;
}

const ratingColor = ['green', 'yellow', 'orange', 'red'];

const HealthCheckEntry = ({ entry }: EntriesListItemProps) => {
  const diagnoses = useAppSelector((state) => state.diagnoses);
  return (
    <>
      <p>
        {entry.date} <MedicalInformationIcon />
      </p>
      <p>
        <em> {entry.description}</em>
      </p>
      <Favorite style={{color: ratingColor[entry.healthCheckRating]}}/>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>{diagnoses.find((d) => d.code === c)?.name}</li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </>
  );
};

export default HealthCheckEntry;
