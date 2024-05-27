import {RRule} from 'rrule';
import * as _ from 'lodash';

const computeWeekly = ({ interval, days }: { interval: number, days: any }) => ({
  freq: RRule.WEEKLY,
  interval,
  byweekday: _.values(days).reduce(
    (activeDays, isDayActive, dayIndex) =>
      (isDayActive ? [...activeDays, dayIndex] : activeDays),
    [],
  ),
});

export default computeWeekly;
