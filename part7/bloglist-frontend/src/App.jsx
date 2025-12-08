import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import { displayNotification } from './reducers/notificationReducer';

import LoginForm from './components/LoginForm';
import MainView from './components/MainView';
import UserInfo from './components/UserInfo';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (loggedInUser) {
      const existingUser = JSON.parse(loggedInUser);
      setUser(existingUser);
      blogService.setToken(existingUser.token);
      dispatch(displayNotification(`${existingUser.username} logged in`));
    }
  }, [dispatch]);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    dispatch(displayNotification('User logged out'));
  };

  return (
    <>
      <UserInfo user={user} onLogout={handleLogout} />
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
      {user && <MainView user={user} />}
    </>
  );
};

export default App;
