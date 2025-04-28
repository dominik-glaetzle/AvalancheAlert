import Sidebar from '../components//Sidebar.tsx';
import { Box } from '@mui/material';
import RegionsCard from '../components/RegionsCard.tsx';
import UserCard from '../components/UserCard.tsx';

export default function Settings() {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                padding: 2,
                gap: 2,
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 3,
                    flexGrow: 1,
                }}
            >
                <UserCard />
                <RegionsCard />
            </Box>
        </Box>
    );
}
