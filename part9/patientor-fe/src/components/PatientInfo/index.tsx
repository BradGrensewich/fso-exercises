import { useParams } from 'react-router-dom';
import EntriesList from './EntriesList';
import { useAppSelector } from '../../hooks';

const PatientInfo = () => {
  const id = useParams().id;
  const patient = useAppSelector((state) =>
    state.patients.find((p) => p.id === id),
  );
  if (!patient) {
    return <h2>Patient not found</h2>;
  }
  return (
    <div>
      <h2>{patient.name}</h2>
      <ul>
        <li>DOB: {patient.dateOfBirth}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
      <EntriesList entries={patient.entries} />
    </div>
  );
};

export default PatientInfo;
