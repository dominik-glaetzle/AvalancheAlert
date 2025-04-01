import axios from 'axios';
import { API_URL } from '../config/config';
import { AvalancheReportDTO, AvalancheReport } from '../DTO/AvalancheReportDTO';
import { createAvalancheReportFromDTO } from '../factories/avalancheReportFactory';

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
            .map(createAvalancheReportFromDTO) // Create AvalancheReport instances
            .map(
                (report) =>
                    new AvalancheReport({
                        ...report,
                        regions: report.regions.filter((region) => region.regionID.startsWith('AT-')),
                    })
            )
            .filter((report) => report.regions.length > 0); // Remove reports without AT regions
    } catch (error: any) {
        throw new Error(`Error fetching avalanche report: ${error.message}`);
    }
};

export const AvalancheReportAPI = {
    fetchLatestAvalancheReports,
    fetchLatestAvalancheReportsFromAustria,
};
