import { configureStore } from '@reduxjs/toolkit';
import diagnosisReducer from './reducers/diagnosisReducer';
import patientReducer from './reducers/patientReducer';

const store = configureStore({
  reducer: {
    diagnoses: diagnosisReducer,
    patients: patientReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
