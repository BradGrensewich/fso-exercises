import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInFromStorage } from './reducers/userReducer';

import LoginForm from './components/LoginForm';
import MainView from './components/MainView';
import UserInfo from './components/UserInfo';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(logInFromStorage());
  }, [dispatch]);

  return (
    <>
      <UserInfo />
      <Notification />
      {!user && <LoginForm />}
      {user && <MainView />}
    </>
  );
};

export default App;
