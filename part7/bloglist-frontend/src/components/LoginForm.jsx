import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayNotification, displayError } from '../reducers/notificationReducer';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import FormInput from './FormInput';

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
      dispatch(displayNotification(`${user.username} logged in`))
    } catch (error) {
      dispatch(displayError(error.message))
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      <FormInput
        label={'username'}
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <FormInput
        label={'password'}
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
