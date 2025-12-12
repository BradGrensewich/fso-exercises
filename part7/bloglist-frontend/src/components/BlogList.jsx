import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
