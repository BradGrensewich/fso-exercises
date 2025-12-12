import { useSelector } from 'react-redux';
import UserTableEntry from './UserTableEntry';

const UsersTable = () => {
  const blogs = useSelector((state) => state.blogs);

  if (blogs.length === 0) {
    return null;
  }
  const users = Object.values(
    blogs.reduce((acc, blog) => {
      if (!acc[blog.user.username]) {
        acc[blog.user.username] = { username: blog.user.username, count: 1 };
      } else {
        acc[blog.user.username].count++;
      }
      return acc;
    }, {}),
  );

  return (
    <table>
      <thead>
        <tr>
          <th> </th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <UserTableEntry user={u} key={u.username} />
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
