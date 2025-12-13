import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInFromStorage } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import MainView from './components/mainview/MainView';
import CurrentUserInfo from './components/CurrentUserInfo';
import Notification from './components/Notification';
import UsersView from './components/usersview/UsersView';
import { initializeUsers } from './reducers/usersReducer';
import UserInfo from './components/userview/UserInfo';
import BlogInfo from './components/blogview/BlogInfo';

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
      <CurrentUserInfo />
      <Notification />

      {!user && <LoginForm />}
      {user && (
        <Router>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/users' element={<UsersView />} />
            <Route path='/users/:id' element={<UserInfo />} />
            <Route path='/blogs/:id' element={<BlogInfo />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
