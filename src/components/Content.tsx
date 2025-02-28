import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import TerrainRoundedIcon from '@mui/icons-material/TerrainRounded';
import SnowingRoundedIcon from '@mui/icons-material/AcUnitRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';

const items = [
    {
        icon: <WarningAmberRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Live AvalancheReport Warnings',
        description: 'Receive daily avalanche warnings for your selected ski resorts.',
    },
    {
        icon: <TerrainRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Customizable Region Selection',
        description: 'Choose from various ski resorts and tailor notifications based on your location.',
    },
    {
        icon: <SnowingRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Snow & Weather Updates',
        description: 'Stay informed about snow depth, temperature, and weather conditions in real time.',
    },
    {
        icon: <NotificationsActiveRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Real-Time Alerts',
        description: 'Get notified via Email, Telegram, or WhatsApp whenever avalanche risks change.',
    },
];

export default function Content() {
    return (
        <Stack sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
            {items.map((item, index) => (
                <Stack key={index} direction="row" sx={{ gap: 2 }}>
                    {item.icon}
                    <div>
                        <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.description}
                        </Typography>
                    </div>
                </Stack>
            ))}
        </Stack>
    );
}
