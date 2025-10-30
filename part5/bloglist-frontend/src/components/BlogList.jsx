import { useEffect, useState } from 'react';
import Blog from './Blog';
import UserInfo from './UserInfo';
import blogService from '../services/blogs';

const BlogList = ({ user, onLogout }) => {
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
  return (
    <div>
      <h2>blogs</h2>
      <UserInfo user={user} onLogout={onLogout} />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
