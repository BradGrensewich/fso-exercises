import UserBlogListItem from './UserBlogListItem';

const UserBlogList = ({ blogs }) => {
  return (
    <>
      <h4>added blogs</h4>
      <ul>
        {blogs.map((b) => (
          <UserBlogListItem key={b.id} blog={b} />
        ))}
      </ul>
    </>
  );
};

export default UserBlogList;
