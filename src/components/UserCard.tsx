import { Card, Typography, Box, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext.tsx';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';

export default function UserCard() {
    const { user } = useAuth();

    return (
        <Card
            sx={{
                ml: 5,
                mt: 5,
                width: 320,
                height: 320,
                p: 2,
                borderRadius: 5,
                backgroundColor: '#1e1e1e',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                    User Settings
                </Typography>
                <Chip
                    icon={<ChangeCircleIcon />}
                    label={'Edit User'}
                    onClick={() => {}}
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
                    {user?.name || 'Anonymous'}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AlternateEmailIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    email
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    telephone
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <PasswordIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    password
                </Typography>
            </Box>
            <Chip
                icon={<DeleteIcon />}
                label={'Delete Account'}
                sx={{
                    backgroundColor: '#F44336',
                    fontWeight: 'bold',
                }}
            />
        </Card>
    );
}
