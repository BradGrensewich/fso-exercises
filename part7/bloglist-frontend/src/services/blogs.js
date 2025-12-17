import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (changedBlog) => {
  //change format of blog from populated FE version, to BE model
  const formattedBlog = { ...changedBlog, user: changedBlog.user.id };
  const config = { headers: { Authorization: token } };
  const response = await axios.put(
    `${baseUrl}/${formattedBlog.id}`,
    formattedBlog,
    config,
  );
  return response.data;
};


const deleteBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

export default { getAll, create, setToken, updateBlog, deleteBlog };
