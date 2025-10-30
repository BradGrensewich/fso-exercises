import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      {!user && <LoginForm setUser={setUser} />}
      {user && <BlogList blogs={blogs} />}
    </>
  );
};

export default App;
