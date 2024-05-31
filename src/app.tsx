
import React, { useState, useEffect } from 'react';

interface Note {
  id: number;
  content: string;
  date: string;
}

const fetchPredefinedNotes = (): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, content: 'Nota preimpostata 1', date: '01/01' },
        { id: 2, content: 'Nota preimpostata 2', date: '02/01' },
        { id: 3, content: 'Nota preimpostata 3', date: '03/01' }
      ]);
    }, 1000);
  });
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInput, setNoteInput] = useState<string>('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      fetchPredefinedNotes().then(predefinedNotes => {
        setNotes(predefinedNotes);
        localStorage.setItem('notes', JSON.stringify(predefinedNotes));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteInput.trim() === '') return;

    const newNote: Note = {
      id: Date.now(),
      content: noteInput,
      date: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: '2-digit' })
    };

    setNotes([...notes, newNote]);
    setNoteInput('');
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div id="app-container">
      <div id="header">Gianluca Social</div>
      <div id="note-form">
        <input
          type="text"
          placeholder="Inserisci una nota"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button onClick={addNote}>Aggiungi Nota</button>
      </div>
      <div id="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <div className="note-content">{note.content}</div>
            <div className="note-date">{note.date}</div>
            <div className="note-buttons">
              <button className="remove-btn" onClick={() => removeNote(note.id)}>Rimuovi</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
