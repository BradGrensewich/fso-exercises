import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addNew = (newObj) => {
  return axios.post(baseUrl, newObj).then((response) => response.data);
}

const updateNote = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj).then((response) => response.data)

}

export default { getAll, addNew, updateNote };
