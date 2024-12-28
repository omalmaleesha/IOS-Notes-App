import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { useNotes } from '../store/NotesContext';
import { formatDate } from '../utils/noteUtils';

export function Editor() {
  const { state, dispatch } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const selectedNote = state.notes.find(note => note.id === state.selectedNoteId);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (selectedNote) {
      dispatch({
        type: 'UPDATE_NOTE',
        payload: {
          ...selectedNote,
          title: newTitle,
          updatedAt: new Date()
        }
      });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (selectedNote) {
      dispatch({
        type: 'UPDATE_NOTE',
        payload: {
          ...selectedNote,
          content: newContent,
          updatedAt: new Date()
        }
      });
    }
  };

  if (!selectedNote) {
    return (
      <div className="flex-1 h-screen bg-white flex items-center justify-center text-gray-400">
        Select or create a note to start writing
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-gray-500">
            {formatDate(selectedNote.updatedAt)}
          </div>
          <button className="text-yellow-600 hover:text-yellow-700">
            <Share2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-6 max-w-3xl mx-auto">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="w-full text-3xl font-semibold mb-4 focus:outline-none"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className="w-full h-[calc(100vh-200px)] resize-none focus:outline-none text-gray-800"
        />
      </div>
    </div>
  );
}