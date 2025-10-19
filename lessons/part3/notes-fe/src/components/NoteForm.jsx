import { useState } from "react";

const NoteForm = ({onAddNote}) => {
  const [newNote, setNewNote] = useState('Type a new note');
    //adding notes
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const handleNoteAdded = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      important: Math.random() > 0.5,
      
    };
    onAddNote(note)
    setNewNote('')
  }

    return (
      <form>
        <input type='text' value={newNote} onChange={handleNoteChange} />
        <button onClick={handleNoteAdded}>Save Note</button>
      </form>
    )
  }
  export default NoteForm