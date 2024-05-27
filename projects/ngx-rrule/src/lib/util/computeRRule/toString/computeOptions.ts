import {RRule} from 'rrule';

const computeOptions = ({ hideStart, weekStartsOnSunday, tz }: { hideStart: boolean, weekStartsOnSunday: boolean, tz: string }) => {
  const options: any = {};

  if (hideStart) {
    options.dtstart = null;
  }

  if (weekStartsOnSunday) {
    options.wkst = RRule.SU;
  }

  options.tzid = tz ? tz : Intl.DateTimeFormat().resolvedOptions().timeZone;
  return options;
};

export default computeOptions;
