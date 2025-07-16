import { Card, Typography, Box, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext.tsx';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import { useEffect, useState } from 'react';
import { getPhoneNumber } from '../api/appwrite.ts';
export default function UserCard() {
    const { user } = useAuth();

    useEffect(() => {
        getPhoneNumber().then((data) => {
            setPhone(data || 'nix da');
        });
    }, []);

    const [phone, setPhone] = useState(user?.phone || '');

    return (
        <>
            <Card
                sx={{
                    ml: 5,
                    mt: 5,
                    width: 320,
                    height: 320,
                    p: 2,
                    borderRadius: 5,
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">
                        User Settings
                    </Typography>
                    <Chip
                        icon={<ChangeCircleIcon />}
                        label={'Edit User'}
                        onClick={() => {
                            alert("to be implemented, but for now you can't edit your user settings, sorry :/");
                        }}
                        sx={{
                            backgroundColor: '#FFC107',
                            color: '#000',
                            fontWeight: 'bold',
                        }}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <AccountCircleIcon fontSize="small" />
                    <Typography variant="body2" color="lightgray">
                        {user?.name}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <AlternateEmailIcon fontSize="small" />
                    <Typography variant="body2" color="lightgray">
                        {user?.email}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2" color="lightgray">
                        {phone}
                    </Typography>
                </Box>
                <Chip
                    icon={<DeleteIcon />}
                    onClick={() => alert("to be implemented, but for now you can't delete your account, sorry :/")}
                    label={'Delete Account'}
                    sx={{
                        backgroundColor: '#F44336',
                        fontWeight: 'bold',
                    }}
                />
            </Card>
        </>
    );
}
