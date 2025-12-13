import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserBlogList from './UserBlogList';

const UserInfo = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));
  return (
    <>
      <h2>{user.username}</h2>
      <UserBlogList blogs={user.blogs} />
    </>
  );
};

export default UserInfo;
