const UserInfo = ({ user, onLogout }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      {user.username} is logged in
      <button onClick={onLogout}>logout</button>
    </div>
  );
};

export default UserInfo;
