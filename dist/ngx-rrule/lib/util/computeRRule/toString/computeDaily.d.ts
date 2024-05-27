declare const computeDaily: (interval: any) => {
    freq: import("rrule").Frequency;
    interval: any;
};
export default computeDaily;
