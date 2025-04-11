import './App.css';
import Page from './components/Page.tsx';
import { AnimatedBackground } from 'animated-backgrounds';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import VerificationPage from './components/VerificationPage.tsx';
import Dashboard from './components/Dashboard.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Page />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </>
    )
);

function App() {
    return (
        <>
            <AnimatedBackground animationName={'cosmicDust'} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
