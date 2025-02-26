import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// dummy api response
const regions = [
    { name: 'Glocknergruppe', regionID: 'AT-07-26' },
    { name: 'Östliche Deferegger Alpen', regionID: 'AT-07-27' },
    { name: 'Schobergruppe', regionID: 'AT-07-28' },
    { name: 'Grödner Dolomiten', regionID: 'IT-32-BZ-18-02' },
    { name: 'Sextner Dolomiten', regionID: 'IT-32-BZ-20' },
];

const filteredRegions = regions.filter((region) => region.regionID.startsWith('AT-'));

export default function RegionDropdown() {
    const [selectedRegion, setSelectedRegion] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedRegion(event.target.value);
    };

    console.log('sel reg:', selectedRegion);

    return (
        <FormControl sx={{ width: 380 }}>
            <InputLabel id="region-select-label">Choose Region</InputLabel>
            <Select labelId="region-select-label" id="region-select" value={selectedRegion} onChange={handleChange}>
                {filteredRegions.map((region) => (
                    <MenuItem key={region.regionID} value={region.regionID}>
                        {region.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
