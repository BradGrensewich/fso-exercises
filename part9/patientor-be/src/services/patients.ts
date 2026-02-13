import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      entries,
      occupation,
    }),
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid(), entries: [] };
  patients.concat(newPatient);
  return newPatient;
};

const addEntryToPatient = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry = { ...entry, id: uuid() };
  const newEntries = patient.entries.concat(newEntry);
  const updatedPatient = { ...patient, entries: newEntries };
  patients.map((p) => (p.id === patient.id ? updatedPatient : p));
  return updatedPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntryToPatient,
};
