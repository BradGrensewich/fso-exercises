import { Patient } from '../types';

interface PatientInfoProps {
  patient: Patient | null;
}
const PatientInfo = ({ patient }: PatientInfoProps) => {
  if (!patient) {
    return <h2>Patient not found</h2>;
  }
  return (
    <div>
      <h3>{patient.name}</h3>

      <ul>
        <li>DOB: {patient.dateOfBirth}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
    </div>
  );
};

export default PatientInfo;
