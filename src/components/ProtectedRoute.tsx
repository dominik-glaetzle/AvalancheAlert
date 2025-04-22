import { Navigate } from 'react-router-dom';
import { JSX, useEffect, useState } from 'react';
import { account } from '../api/appwrite.ts';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await account.get();
                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!authenticated) return <Navigate to="/" replace />;

    return children;
}
