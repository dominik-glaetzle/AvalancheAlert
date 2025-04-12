import './App.css';
import Homepage from './pages/Homepage.tsx';
import VerificationPage from './components/VerificationPage.tsx';
import DashboardPage from './components/DashboardPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
// @ts-ignore
import { AnimatedBackground } from 'animated-backgrounds';

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Homepage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
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
