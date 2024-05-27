import {RRule} from 'rrule';

import computeStart from './computeStart';
import computeRepeat from './computeRepeat';
import computeEnd from './computeEnd';
import computeOptions from './computeOptions';

export const computeRRule = ({
  start,
  repeat,
  end,
  options,
}: {
  start: any,
  repeat: any,
  end: any,
  options: any,
}) => {
  const rruleObject = {
    ...computeStart(start),
    ...computeRepeat(repeat),
    ...computeEnd(end),
    ...computeOptions(options),
  };
  const rrule = new RRule(rruleObject);
  return rrule;
};

