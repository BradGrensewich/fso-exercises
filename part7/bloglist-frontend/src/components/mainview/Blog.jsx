import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <li style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <span>{blog.title}</span> <span>{blog.author} </span>
      </Link>
    </li>
  );
};

export default Blog;
