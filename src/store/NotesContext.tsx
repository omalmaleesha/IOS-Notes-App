import React, { createContext, useContext, useReducer } from 'react';
import { Note, Folder } from '../types';

interface NotesState {
  folders: Folder[];
  notes: Note[];
  selectedFolderId: string | null;
  selectedNoteId: string | null;
}

type Action =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'ADD_FOLDER'; payload: Folder }
  | { type: 'DELETE_FOLDER'; payload: string }
  | { type: 'SELECT_FOLDER'; payload: string | null }
  | { type: 'SELECT_NOTE'; payload: string | null };

const initialState: NotesState = {
  folders: [
    { id: '1', name: 'All Notes' },
    { id: '2', name: 'Personal' },
    { id: '3', name: 'Work' }
  ],
  notes: [],
  selectedFolderId: '1',
  selectedNoteId: null
};

function notesReducer(state: NotesState, action: Action): NotesState {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => 
          note.id === action.payload.id ? action.payload : note
        )
      };
    
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
        selectedNoteId: state.selectedNoteId === action.payload ? null : state.selectedNoteId
      };
    
    case 'ADD_FOLDER':
      return { ...state, folders: [...state.folders, action.payload] };
    
    case 'DELETE_FOLDER':
      return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.payload),
        notes: state.notes.filter(note => note.folderId !== action.payload),
        selectedFolderId: state.selectedFolderId === action.payload ? '1' : state.selectedFolderId
      };
    
    case 'SELECT_FOLDER':
      return { ...state, selectedFolderId: action.payload, selectedNoteId: null };
    
    case 'SELECT_NOTE':
      return { ...state, selectedNoteId: action.payload };
    
    default:
      return state;
  }
}

const NotesContext = createContext<{
  state: NotesState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}