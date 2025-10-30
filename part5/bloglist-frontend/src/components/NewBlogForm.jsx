import { useState } from 'react';
import blogsService from '../services/blogs';
import FormInput from './FormInput';

const NewBlogForm = ({onCreateBlog, displayError}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    try {
      const savedBlog = await blogsService.create(newBlog);
      onCreateBlog(savedBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (error) {
      console.error(error)
      displayError('failed to add blog')

    }
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
