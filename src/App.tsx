import './App.css';
import Homepage from './pages/Homepage.tsx';
import VerificationPage from './components/VerificationPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Settings from './pages/Settings.tsx';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Homepage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DndContext>
                            <Dashboard />
                        </DndContext>
                    </ProtectedRoute>
                }
            />
            <Route path="/settings" element={<Settings />} />
        </>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
