export declare const getDateParts: (date: Date) => {
    year: number;
    month: number;
    day: number;
} | {
    year?: undefined;
    month?: undefined;
    day?: undefined;
};
export declare const isValidDate: (d: any) => boolean;
export declare const formatDate: (date: any) => any;
