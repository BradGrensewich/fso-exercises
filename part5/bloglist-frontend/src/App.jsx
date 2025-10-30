import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import MainView from './components/MainView';

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
      {user && <MainView user={user} onLogout={logout} />}
    </>
  );
};

export default App;
