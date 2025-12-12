const UserTableEntry = ({ user }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.count}</td>
    </tr>
  );
};

export default UserTableEntry;
