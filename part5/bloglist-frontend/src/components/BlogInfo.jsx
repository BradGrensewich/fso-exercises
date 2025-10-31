const BlogInfo = ({ blog, onAddLike }) => {
  return (
    <>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes}{' '}
        <button onClick={() => onAddLike(blog)}>like</button>
      </p>
      <p>added by: {blog.user.username}</p>
    </>
  );
};

export default BlogInfo;
