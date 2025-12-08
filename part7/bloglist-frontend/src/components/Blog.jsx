import BlogInfo from './BlogInfo';
import Toggleable from './Toggleable';

const Blog = ({ blog, onAddLike, onDeleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <li style={blogStyle}>
      <span>{blog.title}</span> <span>{blog.author} </span>
      <Toggleable buttonLabel='view' closeLabel='hide'>
        <BlogInfo
          blog={blog}
          onAddLike={onAddLike}
          onDeleteBlog={onDeleteBlog}
          user={user}
        />
      </Toggleable>
    </li>
  );
};

export default Blog;
