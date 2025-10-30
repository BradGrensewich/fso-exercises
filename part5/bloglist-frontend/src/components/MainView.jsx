import { useEffect, useState } from 'react';

import UserInfo from './UserInfo';
import blogService from '../services/blogs';
import BlogList from './BlogList';
import NewBlogForm from './NewBlogForm';

const MainView = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    try {
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateBlog = (savedBlog) => {
    setBlogs(blogs.concat(savedBlog));
  };
  return (
    <div>
      <UserInfo user={user} onLogout={onLogout} />
      <h2>blogs</h2>
      <NewBlogForm onCreateBlog={handleCreateBlog} />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default MainView;
