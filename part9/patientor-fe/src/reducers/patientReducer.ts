import { createSlice } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';
import {
  HealthCheckEntryFormValues,
  HospitalEntryFormValues,
  OccupationalHealthcareEntryFormValues,
  Patient,
  PatientFormValues,
} from '../types';
import patientService from '../services/patients';

const initialState: Patient[] = [];
const patientSlice = createSlice({
  name: 'patients',
  initialState: initialState,
  reducers: {
    setPatients(_, action) {
      return action.payload;
    },
    appendPatient(state, action) {
      state.push(action.payload);
    },
    updatePatient(state, action) {
      const updated = action.payload;
      return state.map((p) => (p.id === updated.id ? updated : p));
    },
  },
});

const { setPatients, appendPatient, updatePatient } = patientSlice.actions;

export const initialPatients = () => {
  return async (dispatch: AppDispatch) => {
    const patients = await patientService.getAll();
    dispatch(setPatients(patients));
  };
};

export const createPatient = (content: PatientFormValues) => {
  return async (dispatch: AppDispatch) => {
    const newPatient = await patientService.create(content);
    dispatch(appendPatient(newPatient));
  };
};

export const createNewEntry = (
  content:
    | HealthCheckEntryFormValues
    | OccupationalHealthcareEntryFormValues
    | HospitalEntryFormValues,
  id: string,
) => {
  return async (dispatch: AppDispatch) => {
    const updatedPatient = await patientService.addEntry(content, id);
    dispatch(updatePatient(updatedPatient));
  };
};

export default patientSlice.reducer;
