import Blog from './Blog';

const BlogList = ({ blogs, onAddLike }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onAddLike={onAddLike} />
      ))}
    </ul>
  );
};

export default BlogList