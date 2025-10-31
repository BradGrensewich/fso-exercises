import { useEffect, useRef, useState } from 'react';
import blogService from '../services/blogs';
import BlogList from './BlogList';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';

const MainView = ({ displayMessage, displayError }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    try {
      fetchBlogs();
    } catch (error) {
      displayError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateBlog = (savedBlog) => {
    setBlogs(blogs.concat(savedBlog));
    displayMessage('Blog added to DB');
    newBlogFormRef.current.toggleVisibility();
  };

  const newBlogFormRef = useRef();
  return (
    <div>
      <h2>blogs</h2>
      <Toggleable
        buttonLabel='create new blog'
        closeLabel='stop creating blog'
        ref={newBlogFormRef}>
        <NewBlogForm
          onCreateBlog={handleCreateBlog}
          displayError={displayError}
        />
      </Toggleable>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default MainView;
