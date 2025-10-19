import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);  
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };
  //set notes
  useEffect(() => {
    NoteService.getAll()
      .then((initialNotes) => setNotes(initialNotes))
      .catch(() => handleError('Error fetching notes'));
  }, []);

  
  const addNote = (note) => {    
    NoteService.addNew(note)
      .then((savedNote) => {
        setNotes(notes.concat(savedNote));
      })
      .catch(() => {
        handleError('error adding note');
      });
    
  };

  const changeImportance = (id) => {
    const oldNote = notes.find((n) => n.id === id);
    const newNote = { ...oldNote, important: !oldNote.important };
    NoteService.updateNote(id, newNote)
      .then((updated) => {
        setNotes(notes.map((n) => (n.id === id ? updated : n)));
      })
      .catch(() => {
        handleError('error updating note');
      });
  };  

  return (
    <div>
      <h1>Notes</h1>
      <Notification errorMessage={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <NoteList
        notes={notes}
        showAll={showAll}
        changeImportance={changeImportance}
      />
      <NoteForm onAddNote={addNote} />      
    </div>
  );
};

export default App;
