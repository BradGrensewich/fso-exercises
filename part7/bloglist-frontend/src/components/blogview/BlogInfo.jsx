import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLikeToBlog, deleteBlog } from '../../reducers/blogReducer';

const BlogInfo = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.user);

  if (!blog) {
    return null
  }

  const ownedByUser = user.id === blog.user.id;

  const addLike = () => {
    dispatch(addLikeToBlog(blog));
  };

  const remove = () => {
    if (window.confirm(`Remove blog: "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };
  return (
    <>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>
        <span>Likes: {blog.likes}</span> <button onClick={addLike}>like</button>
      </p>
      <p>Added by: {blog.user.username}</p>

      {ownedByUser && <button onClick={remove}>remove</button>}
    </>
  );
};

export default BlogInfo;
