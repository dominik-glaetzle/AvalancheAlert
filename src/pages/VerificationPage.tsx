import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { account } from '../api/appwrite.ts';
import {
    CircularProgress,
    Box,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
        }
    }, []);

    const getContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <>
                        <CircularProgress sx={{ color: '#fff' }} />
                        <Typography mt={2} color="gray">
                            Verifying your account...
                        </Typography>
                    </>
                );
            case 'success':
                return (
                    <>
                        <CheckCircleOutlineIcon fontSize="large" color="success" />
                        <Typography variant="h6" color="success.main" mt={2}>
                            Account verified successfully!
                        </Typography>
                        <Typography variant="body2" color="gray">
                            You’ll be redirected to login shortly...
                        </Typography>
                    </>
                );
            case 'error':
                return (
                    <>
                        <ErrorOutlineIcon fontSize="large" color="error" />
                        <Typography variant="h6" color="error.main" mt={2}>
                            Verification failed.
                        </Typography>
                        <Typography variant="body2" color="gray">
                            Please check your verification link or try again.
                        </Typography>
                    </>
                );
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#121212',
            }}
        >
            <Card
                sx={{
                    width: 400,
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 6,
                    backgroundColor: '#1f2937',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <CardContent>{getContent()}</CardContent>
            </Card>
        </Box>
    );
}