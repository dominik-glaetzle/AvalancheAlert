import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { account } from '../api/appwrite.ts';
import { Alert, CircularProgress, Box } from '@mui/material';

export default function VerificationPage() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        if (userId && secret) {
            account
                .updateVerification(userId, secret)
                .then(() => {
                    setStatus('success');
                    setTimeout(() => navigate('/'), 3000);
                })
                .catch(() => setStatus('error'));
        } else {
            setStatus('error');
            //setTimeout(() => navigate('/'), 1000);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            {status === 'loading' && <CircularProgress />}
            {status === 'success' && (
                <Alert severity="success">✅ Account verified successfully! You can now log in.</Alert>
            )}
            {status === 'error' && <Alert severity="error">❌ Verification failed. Please check your link.</Alert>}
        </Box>
    );
}
