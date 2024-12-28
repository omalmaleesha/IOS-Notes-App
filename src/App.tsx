import React from 'react';
import { NotesProvider } from './store/NotesContext';
import { Sidebar } from './components/Sidebar';
import { NotesList } from './components/NotesList';
import { Editor } from './components/Editor';

function App() {
  return (
    <NotesProvider>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <NotesList />
        <Editor />
      </div>
    </NotesProvider>
  );
}

export default App;