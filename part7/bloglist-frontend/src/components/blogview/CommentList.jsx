const CommentList = ({ comments }) => {
  return (
    <ul>
      <h4>Comments:</h4>
      {comments.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
};

export default CommentList;
