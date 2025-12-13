import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewBlog } from '../../reducers/blogReducer';
import FormInput from './FormInput';

const NewBlogForm = ({ onCreatedBlog }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };

    dispatch(createNewBlog(newBlog));
    setAuthor('');
    setTitle('');
    setUrl('');

    onCreatedBlog();
  };
  return (
    <form onSubmit={createBlog}>
      <h3>Create new:</h3>
      <FormInput
        label={'title'}
        value={title}
        onChange={({ target }) => {
          setTitle(target.value);
        }}
      />
      <FormInput
        label={'author'}
        value={author}
        onChange={({ target }) => {
          setAuthor(target.value);
        }}
      />
      <FormInput
        label={'url'}
        value={url}
        onChange={({ target }) => {
          setUrl(target.value);
        }}
      />
      <button>create</button>
    </form>
  );
};

export default NewBlogForm;
