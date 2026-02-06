import axios from 'axios';
import type { NewEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const createNewEntry = async (entry: NewEntry) => {
  try {
    const response = await axios.post(baseUrl, entry);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data)
    } else {
      console.error(error);
    }
  }
};
