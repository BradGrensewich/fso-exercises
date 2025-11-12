import Note from './Note';

const NoteList = ({ notes, showAll, changeImportance }) => {
  //note visibility
  const visibleNotes = showAll ? notes : notes.filter((n) => n.important);
  return (
    <ul>
      {visibleNotes.map((note) => (
        <Note
          key={note.id}
          content={note.content}
          changeImportance={() => changeImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default NoteList