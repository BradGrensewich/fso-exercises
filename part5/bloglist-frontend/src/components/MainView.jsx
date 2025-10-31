import { useEffect, useRef, useState } from 'react';
import blogsService from '../services/blogs';
import BlogList from './BlogList';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';

const MainView = ({ displayMessage, displayError, user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll();
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

  const handleAddLike = async (blog) => {
    try {
      const updatedBlog = await blogsService.addLike(blog);
      setBlogs(
        blogs.map((b) =>
          b.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : b,
        ),
      );
      displayMessage(`liked "${blog.title}" by ${blog.author}`);
    } catch (error) {
      console.error(error);
      displayError('error adding like to blog');
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await blogsService.deleteBlog(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      displayMessage(`successfully deleted "${blog.title}" by ${blog.author}`);
    } catch (error) {
      console.error(error);
      displayError('error deleting blog from DB');
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
          displayError={displayError}
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
