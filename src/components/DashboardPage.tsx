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
                <AlertCard
                    cardName={'Avalanche Details'}
                    dangerLevel={'low'}
                    type={'wet_snow'}
                    size={'3'}
                    publicationTime={'2025-04-17T15:00:00Z'}
                    snowpackStability={'very_poor'}
                    frequency={'few'}
                    aspects={['NE', 'E', 'W', 'N', 'NW']}
                />
            </Box>
        </Box>
    );
}
