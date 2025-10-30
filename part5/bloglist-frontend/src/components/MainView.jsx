import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import BlogList from './BlogList';
import NewBlogForm from './NewBlogForm';

const MainView = ({ displayMessage, displayError }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log('called');
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    try {
      fetchBlogs();
      displayMessage('blogs fetched from server');
    } catch (error) {
      displayError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateBlog = (savedBlog) => {
    setBlogs(blogs.concat(savedBlog));
    displayMessage('Blog added to DB');
  };
  return (
    <div>
      <h2>blogs</h2>
      <NewBlogForm
        onCreateBlog={handleCreateBlog}
        displayError={displayError}
      />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default MainView;
