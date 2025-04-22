import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Region } from '../interfaces/Regions.ts';

interface RegionStore {
    regions: Region[];
    setRegions: (regions: Region[]) => void;
}

export const useRegionStore = create<RegionStore>()(
    persist(
        (set) => ({
            regions: [],
            setRegions: (regions) => set({ regions }),
        }),
        {
            name: 'region-storage', // <--- key in localStorage
        }
    )
);
