const UserInfo = ({ user, onLogout }) => {
  return (
    <div>
      {user.username} is logged in
      <button onClick={onLogout}>logout</button>
    </div>
  );
};

export default UserInfo;
