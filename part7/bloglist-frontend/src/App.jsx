import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInFromStorage } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import MainView from './components/mainview/MainView';
import Notification from './components/Notification';
import UsersView from './components/usersview/UsersView';
import UserInfo from './components/userview/UserInfo';
import BlogInfo from './components/blogview/BlogInfo';
import Header from './components/header/Header';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(logInFromStorage());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Notification />

      {!user && <LoginForm />}
      {user && (
        <Routes>
          <Route path='/' element={<MainView />} />
          <Route path='/users' element={<UsersView />} />
          <Route path='/users/:id' element={<UserInfo />} />
          <Route path='/blogs/:id' element={<BlogInfo />} />
        </Routes>
      )}
    </>
  );
};

export default App;
