import axios from 'axios';
import {
  Patient,
  PatientFormValues,
  HealthCheckEntryFormValues,
  OccupationalHealthcareEntryFormValues,
  HospitalEntryFormValues
} from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const addEntry = async (object:HealthCheckEntryFormValues | OccupationalHealthcareEntryFormValues | HospitalEntryFormValues, id: string) => {
  try {
    const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,
  );
  return data;  
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        throw new Error(
          typeof error.response.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response.data)
        );
      }
      throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
  }
  
};

export default {
  getAll,
  create,
  addEntry,
};
