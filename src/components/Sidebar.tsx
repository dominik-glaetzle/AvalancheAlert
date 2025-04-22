import { Avatar, Card, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext.tsx';

import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

// TODO: RegionDropdown und anhand von dem dann die cards rendern

function Sidebar() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <Card
            className="w-80 h-[900px] p-6 shadow-lg rounded-lg mt-10 ml-10"
            sx={{
                backgroundColor: '#1e1e1e',
                color: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 5,
            }}
        >
            <div className="flex flex-col items-center gap-3">
                <Avatar src="/avatar.png" alt="User Avatar" sx={{ width: 64, height: 64 }} />
                <Typography variant="h6" className="font-semibold tracking-wide">
                    {user?.name ?? 'Anonymous'}
                </Typography>
            </div>

            <List>
                <ListItem
                    component="button"
                    onClick={() => navigate('/')}
                    className="hover:bg-gray-100 hover:text-black rounded"
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                    component="button"
                    onClick={() => navigate('/')}
                    className="hover:bg-gray-100 hover:text-black rounded"
                >
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem
                    component="button"
                    onClick={() => handleLogout()}
                    className="hover:bg-gray-100 rounded hover:text-black"
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItem>
            </List>

            <div className="text-sm text-gray-500 text-center mt-10">&copy; 2025 Glätzle Dominik</div>
        </Card>
    );
}

export default Sidebar;
