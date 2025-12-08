import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import blogsService from '../services/blogs';
import BlogList from './BlogList';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
import {
  displayError,
  displayNotification,
} from '../reducers/notificationReducer';

const MainView = ({ user }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    };
    try {
      fetchBlogs();
    } catch (error) {
      dispatch(displayError(error.message));
    }
  }, [dispatch]);

  const handleCreateBlog = (savedBlog) => {
    setBlogs(blogs.concat(savedBlog));
    dispatch(displayNotification('Blog added to DB'));
    newBlogFormRef.current.toggleVisibility();
  };

  const handleAddLike = async (blog) => {
    try {
      const updatedBlog = await blogsService.addLike(blog);
      setBlogs(
        blogs.map((b) =>
          b.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : b,
        ),
      );
      dispatch(displayNotification(`liked "${blog.title}" by ${blog.author}`));
    } catch (error) {
      console.error(error);
      dispatch(displayError('error adding like to blog'));
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await blogsService.deleteBlog(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      dispatch(
        displayNotification(
          `successfully deleted "${blog.title}" by ${blog.author}`,
        ),
      );
    } catch (error) {
      console.error(error);
      dispatch(displayError('error deleting blog'));
    }
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
        />
      </Toggleable>

      <BlogList
        blogs={blogs}
        onAddLike={handleAddLike}
        onDeleteBlog={handleDeleteBlog}
        user={user}
      />
    </div>
  );
};

export default MainView;
