import { Patient } from '../../types';
import EntriesList from './EntriesList';

interface PatientInfoProps {
  patient: Patient | null;
}
const PatientInfo = ({ patient }: PatientInfoProps) => {
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
