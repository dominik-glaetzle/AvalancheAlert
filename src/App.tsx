import './App.css';
import Homepage from './pages/Homepage.tsx';
import VerificationPage from './components/VerificationPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
// @ts-ignore
import { AnimatedBackground } from 'animated-backgrounds';

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
        </>
    )
);

function App() {
    return (
        <>
            <AnimatedBackground animationName="cosmicDust" />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
