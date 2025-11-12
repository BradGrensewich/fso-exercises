const Note = ({ content, changeImportance }) => {
  return (
    <li>
      {content} <button onClick={changeImportance}>Change importance</button>
    </li>
  );
};

export default Note;
