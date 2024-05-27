declare const computeWeekly: ({ interval, days }: {
    interval: number;
    days: any;
}) => {
    freq: import("rrule").Frequency;
    interval: number;
    byweekday: any;
};
export default computeWeekly;
