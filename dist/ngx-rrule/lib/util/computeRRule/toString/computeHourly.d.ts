declare const computeHourly: (interval: any) => {
    freq: import("rrule").Frequency;
    interval: any;
};
export default computeHourly;
