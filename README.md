# React Notes App

A beautiful and functional notes application built with React, TypeScript, and Tailwind CSS, inspired by the iOS Notes app.

## Features

- 📝 Create, edit, and delete notes
- 📁 Organize notes in folders
- 🔍 Search functionality (coming soon)
- 📱 Responsive design
- 🎨 Clean and intuitive interface
- ⚡ Fast and efficient
- 🌙 Light theme (dark theme coming soon)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
(https://github.com/omalmaleesha/IOS-Notes-App.git)
cd react-notes-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Editor.tsx      # Note editing interface
│   ├── NotesList.tsx   # List of notes
│   └── Sidebar.tsx     # Folders navigation
├── store/              # State management
│   └── NotesContext.tsx
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Utility functions
│   └── noteUtils.ts
└── App.tsx             # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by Apple's Notes app
- Icons provided by [Lucide](https://lucide.dev/)
