import { useSelector } from 'react-redux';
import UserTableEntry from './UserTableEntry';

const UsersTable = () => {
  const users = useSelector((state) => state.users);

  if (users.length === 0) {
    return null;
  }

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
