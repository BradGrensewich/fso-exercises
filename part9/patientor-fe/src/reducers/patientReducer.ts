import { createSlice } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';
import { Patient, PatientFormValues } from '../types';
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
  },
});

const { setPatients, appendPatient } = patientSlice.actions;

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

export default patientSlice.reducer;
