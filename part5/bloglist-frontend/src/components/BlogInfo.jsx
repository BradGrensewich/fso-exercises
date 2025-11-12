const BlogInfo = ({ blog, onAddLike, onDeleteBlog, user }) => {
  const ownedByUser = (user.id = blog.user.id);

  const addLike = () => {
    onAddLike(blog);
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog: "${blog.title}" by ${blog.author}?`)) {
      onDeleteBlog(blog);
    }
  };
  return (
    <>
      <p>{blog.url}</p>
      <p>
        <span>likes: {blog.likes}</span> <button onClick={addLike}>like</button>
      </p>
      <p>added by: {blog.user.username}</p>
      {ownedByUser && <button onClick={deleteBlog}>remove</button>}
    </>
  );
};

export default BlogInfo;
