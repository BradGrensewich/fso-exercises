import Blog from './Blog';

const BlogList = ({ blogs, onAddLike }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onAddLike={onAddLike} />
      ))}
    </ul>
  );
};

export default BlogList