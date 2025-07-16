import { Card, Typography, Box, Chip, Stack } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import TerrainIcon from '@mui/icons-material/Terrain';
import HeightIcon from '@mui/icons-material/Height';
import TuneIcon from '@mui/icons-material/Tune';
import WavesIcon from '@mui/icons-material/Waves';
import ExploreIcon from '@mui/icons-material/Explore';

type DangerLevel = 'low' | 'moderate' | 'considerable';

interface AlertCardProps {
    cardName: string;
    dangerLevel: DangerLevel;
    type: string;
    size: string;
    publicationTime: string;
    elevation?: {
        lowerBound?: string;
        upperBound?: string;
    };
    snowpackStability: string;
    frequency: string;
    aspects: string[];
}

export default function AvalancheCard({
    cardName,
    dangerLevel,
    type,
    size,
    publicationTime,
    elevation,
    snowpackStability,
    frequency,
    aspects,
}: AlertCardProps) {
    const dangerColors = {
        low: '#4CAF50',
        moderate: '#FFC107',
        considerable: '#F44336',
    };

    const formattedElevation = () => {
        if (!elevation) return '–';
        const { lowerBound, upperBound } = elevation;
        if (lowerBound && upperBound) return `${lowerBound}–${upperBound} m`;
        if (lowerBound) return `ab ${lowerBound} m`;
        if (upperBound) return `bis ${upperBound} m`;
        return '–';
    };

    return (
        <Card
            sx={{
                ml: 5,
                mt: 5,
                width: 320,
                height: 320,
                p: 2,
                borderRadius: 5,
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                    {cardName}
                </Typography>
                <Chip
                    icon={<WarningIcon />}
                    label={dangerLevel.toUpperCase()}
                    sx={{
                        backgroundColor: dangerColors[dangerLevel],
                        color: '#000',
                        fontWeight: 'bold',
                    }}
                />
            </Box>

            <Typography variant="body2" fontStyle="italic" color="gray" sx={{ mt: 1 }}>
                {new Date(publicationTime).toLocaleDateString('de-AT')}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <TerrainIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    Type: {type} {/* TODO: change icon to type icon or something */}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <TerrainIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    Avalanche Size: {size}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <HeightIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    Elevation: {formattedElevation()}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <TuneIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    Stability: {snowpackStability}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <WavesIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    Frequency: {frequency}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <ExploreIcon fontSize="small" />
                <Typography variant="body2" color="lightgray">
                    Aligment:
                </Typography>
            </Box>

            <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
                {aspects.map((aspect) => (
                    <Chip
                        key={aspect}
                        label={aspect}
                        size="small"
                        sx={{
                            backgroundColor: '#333',
                            color: '#fff',
                        }}
                    />
                ))}
            </Stack>
        </Card>
    );
}
