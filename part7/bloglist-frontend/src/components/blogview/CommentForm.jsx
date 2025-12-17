import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToBlog } from '../../reducers/blogReducer';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const addComment = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(blog, comment));
  };

  return (
    <form>
      <input
        type='text'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={addComment}>add comment</button>
    </form>
  );
};

export default CommentForm;
