import BlogInfo from './BlogInfo';
import Toggleable from './Toggleable';

const Blog = ({ blog, onAddLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <li style={blogStyle}>
      {blog.title} {blog.author}
      <Toggleable buttonLabel='view' closeLabel='hide'>
        <BlogInfo blog={blog} onAddLike={onAddLike}/>
      </Toggleable>
    </li>
  );
};

export default Blog;
