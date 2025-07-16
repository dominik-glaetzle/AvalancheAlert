import React, { useEffect, useState } from 'react';
import { AvalancheReport } from '../DTO/AvalancheReportDTO.ts';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRegionStore } from '../store/useRegionStore.ts';
import { AvalancheReportAPI } from '../api/avalancheReport.ts';
import { Region } from '../interfaces/Regions.ts';
import { FormLabel } from '@mui/material';

interface RegionDropdownProps {
    reports: AvalancheReport[];
    onSelectionChange: (selected: Region[]) => void;
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({ reports, onSelectionChange }) => {
    const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
    const [availableRegions, setAvailableRegions] = useState<Region[]>([]);
    const { setRegions } = useRegionStore();

    const handleChange = (event: SelectChangeEvent<Region[]>) => {
        const selected = event.target.value as Region[];
        setSelectedRegions(selected);
        onSelectionChange(selected);
    };

    useEffect(() => {
        if (reports.length > 0) {
            const regions = AvalancheReportAPI.fetchAvailableRegions(reports);
            setAvailableRegions(regions);
            setRegions(regions);
        }
    }, [reports]);
    return (
        <FormControl>
            <FormLabel>choose regions</FormLabel>
            {/* <InputLabel id="region-select-label">choose regions</InputLabel> */}
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
