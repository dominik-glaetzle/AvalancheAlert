import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { AvalancheReport } from '../DTO/AvalancheReportDTO.ts';

interface RegionDropdownProps {
    reports: AvalancheReport[];
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({ reports }) => {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [availableRegions, setAvailableRegions] = useState<{ name: string; regionID: string }[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedRegions(event.target.value as string[]);
    };

    const extractRegionsFromReports = (reports: AvalancheReport[]) => {
        const extractedRegions = reports.flatMap((report) => report.regions);
        console.log('Extracted Regions:', extractedRegions);
        setAvailableRegions(extractedRegions);
    };

    useEffect(() => {
        if (reports.length > 0) {
            extractRegionsFromReports(reports);
        }
    }, [reports]);
    return (
        <FormControl sx={{ width: 380 }}>
            <InputLabel id="region-select-label">Choose Region</InputLabel>
            <Select
                labelId="region-select-label"
                id="region-select"
                value={selectedRegions}
                onChange={handleChange}
                multiple
            >
                {availableRegions.map((region) => (
                    <MenuItem key={region.regionID} value={region.regionID}>
                        {region.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RegionDropdown;
