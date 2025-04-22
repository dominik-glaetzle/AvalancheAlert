import axios from 'axios';
import { API_URL } from '../config/config';
import { AvalancheReport, AvalancheReportDTO } from '../DTO/AvalancheReportDTO';
import { createAvalancheReportFromDTO } from '../factories/avalancheReportFactory';
import { Region } from '../interfaces/Regions.ts';

/**
 * Fetch latest Avalanche Reports
 * @returns Promise<AvalancheReport[]> an array of AvalancheReport objects
 * @throws Error if the request fails
 */
const fetchLatestAvalancheReports = async (): Promise<AvalancheReportDTO[]> => {
    try {
        const response = await axios.get<{ bulletins: AvalancheReportDTO[] }>(API_URL);
        if (!response.data || !response.data.bulletins) {
            throw new Error('Error fetching avalanche report: No data received');
        }
        return response.data.bulletins.map(createAvalancheReportFromDTO);
    } catch (error: any) {
        throw new Error(`Error fetching avalanche report: ${error.message}`);
    }
};

/**
 * Fetch Avalanche Reports for Austria (regionID starts with "AT-")
 * @returns Promise<AvalancheReport[]> an array of AvalancheReport objects filtered by Austria
 * @throws Error if the request fails
 */
const fetchLatestAvalancheReportsFromAustria = async (): Promise<AvalancheReport[]> => {
    try {
        const response = await axios.get<{ bulletins: AvalancheReportDTO[] }>(API_URL);
        if (!response.data || !response.data.bulletins) {
            throw new Error('Error fetching avalanche report: No data received');
        }

        return response.data.bulletins
            .map(createAvalancheReportFromDTO)
            .map(
                (report) =>
                    new AvalancheReport({
                        ...report,
                        regions: report.regions.filter((region) => region.regionID.startsWith('AT-')),
                    })
            )
            .filter((report) => report.regions.length > 0);
    } catch (error: any) {
        throw new Error(`Error fetching avalanche report: ${error.message}`);
    }
};

/**
 * Extract all regions from a list of AvalancheReports
 * @param reports Array of AvalancheReports
 * @returns Array of all Region objects
 */
const fetchAvailableRegions = (reports: AvalancheReport[]): Region[] => {
    return reports.flatMap((report) => report.regions);
};

export const AvalancheReportAPI = {
    fetchLatestAvalancheReports,
    fetchLatestAvalancheReportsFromAustria,
    fetchAvailableRegions,
};
