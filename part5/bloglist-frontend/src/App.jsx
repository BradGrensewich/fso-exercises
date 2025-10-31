import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import MainView from './components/MainView';
import UserInfo from './components/UserInfo';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (loggedInUser) {
      const existingUser = JSON.parse(loggedInUser);
      setUser(existingUser);
      blogService.setToken(existingUser.token);
      displayMessage(`${existingUser.username} logged in`);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    displayMessage('User logged out');
  };

  const displayMessage = (text) => {
    setNotification({ text });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  const displayError = (text) => {
    setNotification({ text, isError: true });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <>
      <UserInfo user={user} onLogout={handleLogout} />
      <Notification notification={notification} />
      {!user && <LoginForm setUser={setUser} displayMessage={displayMessage} displayError={displayError}/>}
      {user && <MainView displayMessage={displayMessage} displayError={displayError} user={user}/>}
    </>
  );
};

export default App;
