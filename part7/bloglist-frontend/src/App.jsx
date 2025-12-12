import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInFromStorage } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import MainView from './components/MainView';
import UserInfo from './components/UserInfo';
import Notification from './components/Notification';
import UsersView from './components/UsersView';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
    
  useEffect(() => {
    dispatch(logInFromStorage());
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <>
      <UserInfo />
      <Notification />

      {!user && <LoginForm />}
      {user && (
        <Router>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/users' element={<UsersView />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
