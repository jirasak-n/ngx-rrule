import { MONTHS } from '../constant';

const computeYearlyOn = (on: any) => ({
  bymonth: MONTHS.indexOf(on.month) + 1,
  bymonthday: on.day,
});

export default computeYearlyOn;
