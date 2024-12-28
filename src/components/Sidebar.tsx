import React, { useState } from 'react';
import { FolderIcon, Search, Settings, PlusCircle, Trash2 } from 'lucide-react';
import { useNotes } from '../store/NotesContext';
import { generateId } from '../utils/noteUtils';

export function Sidebar() {
  const { state, dispatch } = useNotes();
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      dispatch({
        type: 'ADD_FOLDER',
        payload: { id: generateId(), name: newFolderName.trim() }
      });
      setNewFolderName('');
      setIsAddingFolder(false);
    }
  };

  const handleDeleteFolder = (id: string) => {
    if (id !== '1') { // Prevent deleting "All Notes"
      dispatch({ type: 'DELETE_FOLDER', payload: id });
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Folders</h1>
          <button 
            onClick={() => setIsAddingFolder(true)}
            className="text-yellow-600 hover:text-yellow-700"
          >
            <PlusCircle size={20} />
          </button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {isAddingFolder && (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New Folder"
              className="flex-1 px-3 py-1 border rounded"
              onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
              autoFocus
            />
            <button
              onClick={handleAddFolder}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Add
            </button>
          </div>
        )}

        <div className="space-y-2">
          {state.folders.map((folder) => (
            <div
              key={folder.id}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors group ${
                state.selectedFolderId === folder.id ? 'bg-gray-200' : ''
              }`}
            >
              <button
                onClick={() => dispatch({ type: 'SELECT_FOLDER', payload: folder.id })}
                className="flex items-center space-x-3 flex-1 text-left"
              >
                <FolderIcon size={18} className="text-gray-600" />
                <span className="text-gray-800">{folder.name}</span>
              </button>
              {folder.id !== '1' && (
                <button
                  onClick={() => handleDeleteFolder(folder.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 ml-2"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}