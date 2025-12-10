import { useDispatch, useSelector } from 'react-redux';
import { addLikeToBlog, deleteBlog } from '../reducers/blogReducer';

const BlogInfo = ({ blog}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  
  const ownedByUser = (user.id === blog.user.id);

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
      <p>{blog.url}</p>
      <p>
        <span>likes: {blog.likes}</span> <button onClick={addLike}>like</button>
      </p>
      <p>added by: {blog.user.username}</p>
      {ownedByUser && <button onClick={remove}>remove</button>}
    </>
  );
};

export default BlogInfo;
