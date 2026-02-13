import { useAppSelector } from '../../hooks';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry as Entry } from '../../types';

interface HospitalEntryProps {
  entry: Entry;
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  const diagnoses = useAppSelector((state) => state.diagnoses);
  return (
    <>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>
        <em> {entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>{diagnoses.find((d) => d.code === c)?.name}</li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
      <p>
        discharge: {entry.discharge.criteria} on {entry.discharge.date}
      </p>
    </>
  );
};

export default HospitalEntry;
