import { createSlice } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';
import { Diagnosis } from '../types';
import diagnosisService from '../services/diagnoses';

const initialState: Diagnosis[] = [];

const diagnosisSlice = createSlice({
  name: 'diagnoses',
  initialState: initialState,
  reducers: {
    setDiagnoses(_, action) {
      return action.payload;
    },
  },
});

const { setDiagnoses } = diagnosisSlice.actions;

export const initializeDiagnoses = () => {
  return async (dispatch: AppDispatch) => {
    const diagnoses = await diagnosisService.getAll();
    dispatch(setDiagnoses(diagnoses));
  };
};

export default diagnosisSlice.reducer;
