```markdown
# 🛒 Shopping List Application (Frontend Client)

This is the frontend user interface for the Shopping List assignment. It is a modern, responsive Single Page Application (SPA) built to manage collaborative shopping lists. 

## 🛠 Tech Stack

* **Framework**: React 18
* **Build Tool**: Vite
* **Language**: TypeScript
* **Routing**: React Router v7 (`react-router-dom`)
* **State Management**: Zustand
* **Styling**: Tailwind CSS & PostCSS
* **Icons**: Lucide React

## 📂 Project Structure

The client application is organized by feature and responsibility:

```text
client/src/
  ├── components/   # Reusable UI components (Modals, Headers, Rows)
  ├── pages/        # Route-level components (Overview, Detail View)
  ├── store/        # Zustand state management (useListStore.ts)
  ├── types/        # TypeScript interfaces (ShoppingList, Item, Member)
  ├── App.tsx       # Root component and Router configuration
  └── main.tsx      # React DOM entry point
```

## 🚀 Getting Started

### 1. Installation

Ensure you are using `pnpm` as your package manager. From the `client` directory, run:

```bash
pnpm install
```

### 2. Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
pnpm run dev
```
The application will be available at **http://localhost:5173** (or the next available port assigned by Vite).

### 3. Production Build

To compile the application for production deployment or assignment submission:

```bash
pnpm run build
```
This will bundle the React application and output the optimized, static files into the `dist/` directory.

## 🗺️ Routing Architecture

The application implements client-side routing with the following structure:

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `<ListsOverview />` | Displays all shopping lists as interactive tiles. Includes functionality to create new lists and delete existing ones via modals. |
| `/list/:id` | `<ListDetailView />` | Displays the specific contents of a shopping list. Handles adding/removing members, renaming the list, and toggling/deleting items. |

## 🧠 State Management (Zustand)

Global application state is managed via Zustand in `useListStore.ts`.

As per assignment requirements, the initial state is populated by a constant containing default shopping lists. The store manages an array of `ShoppingList` objects and exposes actions to mutate both the lists and their nested entities (Items and Members).
```

---

With this README in place, your frontend documentation is completely synchronized with the actual codebase we just built!