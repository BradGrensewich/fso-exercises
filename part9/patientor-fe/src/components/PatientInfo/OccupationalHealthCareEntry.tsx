import { useAppSelector } from '../../hooks';
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry as Entry } from '../../types';

interface OccupationalHealthCareEntryProps {
  entry: Entry;
}

const OccupationalHealthCareEntry = ({ entry }: OccupationalHealthCareEntryProps) => {
  const diagnoses = useAppSelector((state) => state.diagnoses);
  return (
    <>
      <p>{entry.date} <WorkIcon/> {entry.employerName}</p>
      <p>
        <em> {entry.description}</em>
      </p>     
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>{diagnoses.find((d) => d.code === c)?.name}</li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </>
  );
};

export default OccupationalHealthCareEntry;