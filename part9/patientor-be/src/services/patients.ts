import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, nonSensitivePatient, newPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: newPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patients.concat(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
