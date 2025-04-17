import Sidebar from './Sidebar.tsx';
import AlertCard from './AlertCard.tsx';
import { Box } from '@mui/material';

export default function DashboardPage() {
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
                <AlertCard name={'Wetter'} />
                <AlertCard name={'Schneehöhe'} />
                <AlertCard name={'Lawinengefahr'} />
            </Box>
        </Box>
    );
}
