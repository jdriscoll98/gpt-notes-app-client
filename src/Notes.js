import React, { useState, useEffect } from "react";
import NotesService from "./NotesService";
import { useRef } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const titleInput = useRef();
  const contentInput = useRef();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await NotesService.getNotes();
    setNotes(response.data);
  };

  const createNote = async (event) => {
    event.preventDefault();
    const newNote = {
      title: titleInput.current.value,
      content: contentInput.current.value,
    };
    await NotesService.createNote(newNote);
    fetchNotes();
    event.target.reset();
  };

  const deleteNote = async (id) => {
    await NotesService.deleteNote(id);
    fetchNotes();
  };

  const updateNote = async (event) => {
    event.preventDefault();
    const updatedNote = {
      ...selectedNote,
      title: titleInput.current.value,
      content: contentInput.current.value,
    };
    await NotesService.updateNote(updatedNote.id, updatedNote);
    setSelectedNote(null);
    fetchNotes();
  };

  // Add this function inside the Notes component, before the return statement
  const editNote = (note) => {
    setSelectedNote(note);
    titleInput.current.value = note.title;
    contentInput.current.value = note.content;
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={selectedNote ? updateNote : createNote}>
        <input ref={titleInput} type="text" placeholder="Note title" required />
        <textarea
          ref={contentInput}
          placeholder="Note content"
          required
        ></textarea>
        <button type="submit">
          {selectedNote ? "Update Note" : "Add Note"}
        </button>
        {selectedNote && (
          <button
            type="button"
            onClick={() => {
              setSelectedNote(null);
              titleInput.current.value = "";
              contentInput.current.value = "";
            }}
          >
            Clear Selection
          </button>
        )}
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => editNote(note)}>
            {note.title}
            <button
              className="delete"
              onClick={(event) => {
                event.stopPropagation();
                deleteNote(note.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
