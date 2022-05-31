export interface PSI
{
    items: {
        readings: {
            [key in string]: {
                central: string
                east: string
                national: string
                north: string
                south: string
                west: string
            }
        }
        timestamp: string;
        update_timestamp: string
    }[]
}