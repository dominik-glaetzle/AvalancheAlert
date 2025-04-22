import { useEffect, useState } from 'react';
import { Card, Chip, Typography, Stack } from '@mui/material';
import { useRegionStore } from '../store/useRegionStore.ts';
import { getSubscribedRegions } from '../api/appwrite.ts';

type Subscription = {
    regionID: string;
};

export default function RegionsCard() {
    const { regions } = useRegionStore();
    const [subscribedRegionsID, setSubscribedRegionsID] = useState<Subscription[]>([]);

    useEffect(() => {
        getSubscribedRegions().then((data) => {
            setSubscribedRegionsID(data || []);
        });
    }, []);

    // @ts-ignore - pfusch aber it works haha
    const availableRegions = regions.filter((region) => !subscribedRegionsID.find((sub) => sub === region.regionID));

    // @ts-ignore
    const subscribedRegions = regions.filter((region) => subscribedRegionsID.find((sub) => sub === region.regionID));

    return (
        <Card
            sx={{
                ml: 5,
                mt: 5,
                width: 700,
                height: 500,
                p: 2,
                borderRadius: 5,
                backgroundColor: '#1e1e1e',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={0.1}>
                Available Regions
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
                {availableRegions.map((region) => (
                    <Chip
                        key={region.regionID}
                        label={region.name}
                        size="small"
                        sx={{ backgroundColor: '#333', color: '#fff' }}
                    />
                ))}
            </Stack>

            <Typography variant="h6" fontWeight="bold" mt={2}>
                Subscribed Regions
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
                {subscribedRegions.map((region) => (
                    <Chip
                        key={region.regionID}
                        label={region.name}
                        size="small"
                        sx={{ backgroundColor: '#333', color: '#fff' }}
                    />
                ))}
            </Stack>
        </Card>
    );
}
