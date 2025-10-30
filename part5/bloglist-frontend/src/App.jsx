import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (loggedInUser) {
      const existingUser = JSON.parse(loggedInUser);
      setUser(existingUser);
      blogService.setToken(existingUser.token);
    }
  }, []);

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  return (
    <>
      {!user && <LoginForm setUser={setUser} />}
      {user && <BlogList user={user} onLogout={logout} />}
    </>
  );
};

export default App;
