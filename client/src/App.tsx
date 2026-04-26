import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListDetailView } from './pages/ListDetailView';
import { ListsOverview } from './pages/ListsOverview';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[var(--bg)]">
                <Routes>
                    <Route path="/" element={<ListsOverview />} />
                    <Route path="/list/:id" element={<ListDetailView />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;