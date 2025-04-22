import { Region } from '../interfaces/Regions.ts';

/**
 * AvalancheReport Report DTO
 */
export interface AvalancheReportDTO {
    publicationTime: string;
    validTime: {
        startTime: string;
        endTime: string;
    };
    avalancheActivity?: {
        highlights?: string;
        comment?: string;
    };
    dangerRatings?: {
        mainValue: string;
        elevation?: {
            lowerBound?: string;
            upperBound?: string;
        };
    }[];
    regions: Region[];
}

/**
 * AvalancheReport Report class with methods for serialization
 */
export class AvalancheReport implements AvalancheReportDTO {
    publicationTime: string;
    validTime: { startTime: string; endTime: string };
    avalancheActivity?: { highlights?: string; comment?: string };
    dangerRatings?: { mainValue: string; elevation?: { lowerBound?: string; upperBound?: string } }[];
    regions: { name: string; regionID: string }[];

    /**
     * Constructor for the AvalancheReportDTO class
     * @param data :AvalancheReportDTO object
     */
    constructor(data: AvalancheReportDTO) {
        this.publicationTime = data.publicationTime;
        this.validTime = data.validTime;
        this.avalancheActivity = data.avalancheActivity;
        this.dangerRatings = data.dangerRatings;
        this.regions = data.regions;
    }

    /**
     * Serialize the AvalancheReportDTO instance to a JSON object
     * @returns JSON object
     */
    toJSON(): AvalancheReportDTO {
        return {
            publicationTime: this.publicationTime,
            validTime: this.validTime,
            avalancheActivity: this.avalancheActivity,
            dangerRatings: this.dangerRatings,
            regions: this.regions,
        };
    }

    /**
     * Filter regions by country code prefix
     * @param countryCode The country code to filter by (e.g., 'AT')
     * @returns A new AvalancheReportDTO instance with filtered regions
     */
    filterByCountry(countryCode: string): AvalancheReportDTO {
        return new AvalancheReport({
            publicationTime: this.publicationTime,
            validTime: this.validTime,
            avalancheActivity: this.avalancheActivity,
            dangerRatings: this.dangerRatings,
            regions: this.regions.filter((region) => region.regionID.startsWith(countryCode)),
        });
    }

    /**
     * Create an empty AvalancheReportDTO instance
     * @returns AvalancheReportDTO instance with empty fields
     */
    static empty(): AvalancheReportDTO {
        return new AvalancheReport({
            publicationTime: '',
            validTime: { startTime: '', endTime: '' },
            avalancheActivity: {},
            dangerRatings: [],
            regions: [],
        });
    }

    /**
     * Create an AvalancheReportDTO instance from a JSON object
     * @param json
     * @returns AvalancheReportDTO instance
     */
    static fromJSON(json: any): AvalancheReportDTO {
        if (!json || typeof json !== 'object') {
            throw new Error('Invalid JSON for AvalancheReportDTO');
        }
        return new AvalancheReport(json);
    }
}
