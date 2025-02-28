import { AvalancheReport, AvalancheReportDTO } from '../DTO/AvalancheReportDTO.ts';

/**
 * Create a AvalancheReportDTO object from a AvalancheReportDTO object
 * @param data :AvalancheReportDTO
 * @returns AvalancheReportDTO instance
 */
export const createAvalancheReportFromDTO = (data: AvalancheReportDTO): AvalancheReportDTO => {
    return new AvalancheReport(data);
};
