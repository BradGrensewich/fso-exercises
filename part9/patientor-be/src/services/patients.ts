import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    entries,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid(), entries: [] };
  patients.concat(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
