import axios from 'axios';
import type { NewEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const createNewEntry = async (entry: NewEntry) => {
  const response = await axios.post(baseUrl, entry);
  console.log(response);
  return response.data;
};
