import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};
