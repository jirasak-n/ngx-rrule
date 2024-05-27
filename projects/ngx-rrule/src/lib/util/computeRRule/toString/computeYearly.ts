import {RRule} from 'rrule';

import computeYearlyOn from './computeYearlyOn';
import computeYearlyOnThe from './computeYearlyOnThe';

const computeYearly = ({ mode, on, onThe }: { mode: string, on: any, onThe: any }) => {
  if (on  || onThe) {
    return {
      freq: RRule.YEARLY,
      ...(mode === 'on' ? computeYearlyOn(on) : computeYearlyOnThe(onThe))
    };
  } else {
    return {};
  }
};

export default computeYearly;

