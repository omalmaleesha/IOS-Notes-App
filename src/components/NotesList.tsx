import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useNotes } from '../store/NotesContext';
import { generateId, formatDate } from '../utils/noteUtils';

export function NotesList() {
  const { state, dispatch } = useNotes();

  const filteredNotes = state.notes.filter(note => 
    state.selectedFolderId === '1' || note.folderId === state.selectedFolderId
  );

  const handleAddNote = () => {
    const newNote = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      folderId: state.selectedFolderId || '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
    dispatch({ type: 'SELECT_NOTE', payload: newNote.id });
  };

  const handleDeleteNote = (id: string) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  return (
    <div className="w-80 h-screen bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {filteredNotes.length} Notes
          </h2>
          <button 
            onClick={handleAddNote}
            className="text-yellow-600 hover:text-yellow-700"
          >
            <PlusCircle size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`w-full p-3 rounded-lg hover:bg-gray-200 transition-colors group ${
                state.selectedNoteId === note.id ? 'bg-gray-200' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <button
                  onClick={() => dispatch({ type: 'SELECT_NOTE', payload: note.id })}
                  className="flex-1 text-left"
                >
                  <h3 className="font-medium text-gray-800 mb-1">{note.title}</h3>
                  <div className="flex text-sm text-gray-500">
                    <span>{formatDate(note.updatedAt)}</span>
                    <span className="mx-2">•</span>
                    <span className="truncate">{note.content}</span>
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 ml-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}