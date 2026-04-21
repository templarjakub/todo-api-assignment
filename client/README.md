todo-firstweek
A modern, high-performance shopping list and task management application built with React 19 and Vite 6. This project features a modern design system, global state management, and owner-based permission logic.

🚀 Tech Stack
Frontend Framework: React 19.

Build Tool: Vite 6.

Styling: Tailwind CSS v3 (PostCSS integrated).

State Management: Zustand (Global Store).

Icons: Lucide React.

✨ Key Features
List Detail View: A centralized dashboard to manage items and collaborators.

Member Management: Owners can invite new members and manage existing collaborators.

Ownership Logic: Dynamic UI that toggles features (like Archive or Remove Member) based on whether the user is an OWNER or MEMBER.

Global State: Persistent-ready data architecture using Zustand to handle list updates across components.

Responsive Design: Optimized for both desktop and mobile viewing using Tailwind's utility-first approach.

📂 Project Structure
Plaintext
src/
├── components/   # Reusable UI (ItemRow, ItemManager, MemberManager, etc.)
├── pages/        # Route-level views (ListDetailView)
├── store/        # Zustand global state (useListStore)
├── types/        # TypeScript interfaces and models
├── App.tsx       # Root application component
└── index.css     # Tailwind directives and custom design tokens
🛠️ Getting Started
Prerequisites
Node.js (v24.14.0 or higher recommended)

npm (v11.9.0 or higher)

Installation
Clone the repository and install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open in browser:
Navigate to http://localhost:5173 to view the application.

<img width="3045" height="2165" alt="image" src="https://github.com/user-attachments/assets/0c2fecf6-13e6-41a8-803e-29966af6e869" />
