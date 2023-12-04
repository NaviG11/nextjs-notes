"use client";
import { useState, useRef, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
  // Estado para el titulo y el contenido de la nota
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();
  console.log(selectedNote)
  // Cuando se selecciona una nota, se actualiza el estado del titulo y el contenido
  useEffect(() => {
    // Si hay una nota seleccionada, se actualiza el estado del titulo y el contenido
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(title);
        console.log(content);
        if (selectedNote) {
          // Si hay una nota seleccionada, se actualiza
          await updateNote(selectedNote.id, {
            title,
            content,
          });
          setSelectedNote(null);
        } else {
          await createNote({
            title,
            content,
          });
        }
        setTitle("");
        setContent("");
        titleRef.current?.focus();
      }}
    >
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />

      <textarea
        name="title"
        placeholder="Content"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>

      <div className="flex justify-end gap-x-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title || !content}
          type="submit"
        >
          {selectedNote ? "Update" : "Create"}
        </button>

        {selectedNote && (
          <button
            className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
            type="button"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
