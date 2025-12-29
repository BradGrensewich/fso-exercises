import patients from '../../data/patients';
import { Patient, nonSensitivePatients } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): nonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getNonSensitivePatients };
