import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/userReducer';
import FormInput from './mainview/FormInput';

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();    
      dispatch(logIn(username, password))
      setPassword('');
      setUsername('');   
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
