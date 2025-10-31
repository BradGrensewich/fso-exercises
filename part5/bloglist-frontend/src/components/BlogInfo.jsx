const BlogInfo = ({ blog }) => {
  return (
    <>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button>like</button></p>
      <p>added by: {blog.user.username}</p>
    </>
  );
};

export default BlogInfo;
