const CommentList = ({ comments }) => {
  return (
    <ul>      
      {comments.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
};

export default CommentList;
