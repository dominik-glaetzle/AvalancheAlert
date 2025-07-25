import Sidebar from '../components//Sidebar.tsx';
import AvalancheCard from '../components/AvalancheCard.tsx';
import { Box } from '@mui/material';

export default function Dashboard() {
    return (
        <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
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
                    <AvalancheCard
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
        </div>
    );
}
