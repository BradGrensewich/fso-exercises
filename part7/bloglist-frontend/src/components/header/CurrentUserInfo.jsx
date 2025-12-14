import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../reducers/userReducer'

const CurrentUserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }
  return (
    <div>
      {user.username} is logged in
      <button onClick={() => dispatch(logOut())}>logout</button>
    </div>
  );
};

export default CurrentUserInfo;
