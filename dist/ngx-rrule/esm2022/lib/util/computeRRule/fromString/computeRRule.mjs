import { rrulestr as RRuleObjectFromString } from 'rrule';
import computeStartOnDate from './computeStartOnDate';
import computeFrequency from './computeFrequency';
import computeYearlyMode from './computeYearlyMode';
import computeYearlyOnMonth from './computeYearlyOnMonth';
import computeYearlyOnMonthday from './computeYearlyOnMonthday';
import computeYearlyOnTheMonth from './computeYearlyOnTheMonth';
import computeYearlyOnTheMonthday from './computeYearlyOnTheMonthday';
import computeYearlyOnTheWhich from './computeYearlyOnTheWhich';
import computeMonthlyMode from './computeMonthlyMode';
import computeMonthlyInterval from './computeMonthlyInterval';
import computeMonthlyOnDay from './computeMonthlyOnDay';
import computeMonthlyOnTheDay from './computeMonthlyOnTheDay';
import computeMonthlyOnTheWhich from './computeMonthlyOnTheWhich';
import computeWeeklyInterval from './computeWeeklyInterval';
import computeWeeklyDays from './computeWeeklyDays';
import computeWeekStartDay from './computeWeekStartDay';
import computeDailyInterval from './computeDailyInterval';
import computeHourlyInterval from './computeHourlyInterval';
import computeEndMode from './computeEndMode';
import computeEndAfter from './computeEndAfter';
import computeEndOnDate from './computeEndOnDate';
import { formatDate } from "../../common";
export const computeRRule = (data, rrule) => {
    if (!rrule) {
        return data;
    }
    let newDataObj;
    try {
        const rruleOrigOptions = RRuleObjectFromString(rrule).origOptions;
        newDataObj = {
            ...data,
            start: {
                ...data.start,
                onDate: {
                    date: formatDate(computeStartOnDate(data, rruleOrigOptions)),
                    options: {
                        ...data.start.onDate.options,
                        weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
                    },
                },
            },
            repeat: {
                ...data.repeat,
                frequency: computeFrequency(data, rruleOrigOptions),
                yearly: {
                    ...data.repeat.yearly,
                    mode: computeYearlyMode(data, rruleOrigOptions),
                    on: {
                        month: computeYearlyOnMonth(data, rruleOrigOptions),
                        day: computeYearlyOnMonthday(data, rruleOrigOptions),
                    },
                    onThe: {
                        month: computeYearlyOnTheMonth(data, rruleOrigOptions),
                        day: computeYearlyOnTheMonthday(data, rruleOrigOptions),
                        which: computeYearlyOnTheWhich(data, rruleOrigOptions),
                    },
                },
                monthly: {
                    ...data.repeat.monthly,
                    mode: computeMonthlyMode(data, rruleOrigOptions),
                    interval: computeMonthlyInterval(data, rruleOrigOptions),
                    on: {
                        day: computeMonthlyOnDay(data, rruleOrigOptions),
                    },
                    onThe: {
                        day: computeMonthlyOnTheDay(data, rruleOrigOptions),
                        which: computeMonthlyOnTheWhich(data, rruleOrigOptions),
                    },
                },
                weekly: {
                    interval: computeWeeklyInterval(data, rruleOrigOptions),
                    days: computeWeeklyDays(data, rruleOrigOptions),
                    options: {
                        weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
                    },
                },
                daily: {
                    interval: computeDailyInterval(data, rruleOrigOptions),
                },
                hourly: {
                    interval: computeHourlyInterval(data, rruleOrigOptions),
                },
            },
            end: {
                ...data.end,
                mode: computeEndMode(data, rruleOrigOptions),
                after: computeEndAfter(data, rruleOrigOptions),
                onDate: {
                    date: formatDate(computeEndOnDate(data, rruleOrigOptions)),
                    options: {
                        ...data.end.onDate.options,
                        weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
                    },
                },
            },
            options: {
                ...data.options,
                weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
            },
            error: null,
        };
    }
    catch (e) {
        return { ...data, error: { value: rrule, message: e } };
    }
    return newDataObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZVJSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXJydWxlL3NyYy9saWIvdXRpbC9jb21wdXRlUlJ1bGUvZnJvbVN0cmluZy9jb21wdXRlUlJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsSUFBSSxxQkFBcUIsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUcxRCxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxpQkFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sdUJBQXVCLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyx1QkFBdUIsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLDBCQUEwQixNQUFNLDhCQUE4QixDQUFDO0FBQ3RFLE9BQU8sdUJBQXVCLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxrQkFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLHNCQUFzQixNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sbUJBQW1CLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxzQkFBc0IsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLHdCQUF3QixNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8scUJBQXFCLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxpQkFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLG1CQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sb0JBQW9CLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxxQkFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztB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Z0IsQ0FBQztpQkFDeEQ7YUFDRjtZQUNELEdBQUcsRUFBRTtnQkFDSCxHQUFHLElBQUksQ0FBQyxHQUFHO2dCQUNYLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDO2dCQUM1QyxLQUFLLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDOUMsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQzFELE9BQU8sRUFBRTt3QkFDUCxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU87d0JBQzFCLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztxQkFDaEU7aUJBQ0Y7YUFDRjtZQUNELE9BQU8sRUFBRTtnQkFDUCxHQUFHLElBQUksQ0FBQyxPQUFPO2dCQUNmLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQzthQUNoRTtZQUNELEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztJQUNKLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJydWxlc3RyIGFzIFJSdWxlT2JqZWN0RnJvbVN0cmluZyB9IGZyb20gJ3JydWxlJztcblxuaW1wb3J0IHsgREFURV9USU1FX0ZPUk1BVCB9IGZyb20gJy4uL2NvbnN0YW50JztcbmltcG9ydCBjb21wdXRlU3RhcnRPbkRhdGUgZnJvbSAnLi9jb21wdXRlU3RhcnRPbkRhdGUnO1xuaW1wb3J0IGNvbXB1dGVGcmVxdWVuY3kgZnJvbSAnLi9jb21wdXRlRnJlcXVlbmN5JztcbmltcG9ydCBjb21wdXRlWWVhcmx5TW9kZSBmcm9tICcuL2NvbXB1dGVZZWFybHlNb2RlJztcbmltcG9ydCBjb21wdXRlWWVhcmx5T25Nb250aCBmcm9tICcuL2NvbXB1dGVZZWFybHlPbk1vbnRoJztcbmltcG9ydCBjb21wdXRlWWVhcmx5T25Nb250aGRheSBmcm9tICcuL2NvbXB1dGVZZWFybHlPbk1vbnRoZGF5JztcbmltcG9ydCBjb21wdXRlWWVhcmx5T25UaGVNb250aCBmcm9tICcuL2NvbXB1dGVZZWFybHlPblRoZU1vbnRoJztcbmltcG9ydCBjb21wdXRlWWVhcmx5T25UaGVNb250aGRheSBmcm9tICcuL2NvbXB1dGVZZWFybHlPblRoZU1vbnRoZGF5JztcbmltcG9ydCBjb21wdXRlWWVhcmx5T25UaGVXaGljaCBmcm9tICcuL2NvbXB1dGVZZWFybHlPblRoZVdoaWNoJztcbmltcG9ydCBjb21wdXRlTW9udGhseU1vZGUgZnJvbSAnLi9jb21wdXRlTW9udGhseU1vZGUnO1xuaW1wb3J0IGNvbXB1dGVNb250aGx5SW50ZXJ2YWwgZnJvbSAnLi9jb21wdXRlTW9udGhseUludGVydmFsJztcbmltcG9ydCBjb21wdXRlTW9udGhseU9uRGF5IGZyb20gJy4vY29tcHV0ZU1vbnRobHlPbkRheSc7XG5pbXBvcnQgY29tcHV0ZU1vbnRobHlPblRoZURheSBmcm9tICcuL2NvbXB1dGVNb250aGx5T25UaGVEYXknO1xuaW1wb3J0IGNvbXB1dGVNb250aGx5T25UaGVXaGljaCBmcm9tICcuL2NvbXB1dGVNb250aGx5T25UaGVXaGljaCc7XG5pbXBvcnQgY29tcHV0ZVdlZWtseUludGVydmFsIGZyb20gJy4vY29tcHV0ZVdlZWtseUludGVydmFsJztcbmltcG9ydCBjb21wdXRlV2Vla2x5RGF5cyBmcm9tICcuL2NvbXB1dGVXZWVrbHlEYXlzJztcbmltcG9ydCBjb21wdXRlV2Vla1N0YXJ0RGF5IGZyb20gJy4vY29tcHV0ZVdlZWtTdGFydERheSc7XG5pbXBvcnQgY29tcHV0ZURhaWx5SW50ZXJ2YWwgZnJvbSAnLi9jb21wdXRlRGFpbHlJbnRlcnZhbCc7XG5pbXBvcnQgY29tcHV0ZUhvdXJseUludGVydmFsIGZyb20gJy4vY29tcHV0ZUhvdXJseUludGVydmFsJztcbmltcG9ydCBjb21wdXRlRW5kTW9kZSBmcm9tICcuL2NvbXB1dGVFbmRNb2RlJztcbmltcG9ydCBjb21wdXRlRW5kQWZ0ZXIgZnJvbSAnLi9jb21wdXRlRW5kQWZ0ZXInO1xuaW1wb3J0IGNvbXB1dGVFbmRPbkRhdGUgZnJvbSAnLi9jb21wdXRlRW5kT25EYXRlJztcbmltcG9ydCB7Zm9ybWF0RGF0ZX0gZnJvbSBcIi4uLy4uL2NvbW1vblwiO1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZVJSdWxlID0gKGRhdGE6IGFueSwgcnJ1bGU6IGFueSkgPT4ge1xuICBpZiAoIXJydWxlKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBsZXQgbmV3RGF0YU9iajtcbiAgdHJ5IHtcbiAgICBjb25zdCBycnVsZU9yaWdPcHRpb25zID0gUlJ1bGVPYmplY3RGcm9tU3RyaW5nKHJydWxlKS5vcmlnT3B0aW9ucztcbiAgICBuZXdEYXRhT2JqID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIC4uLmRhdGEuc3RhcnQsXG4gICAgICAgIG9uRGF0ZToge1xuICAgICAgICAgIGRhdGU6IGZvcm1hdERhdGUoY29tcHV0ZVN0YXJ0T25EYXRlKGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAuLi5kYXRhLnN0YXJ0Lm9uRGF0ZS5vcHRpb25zLFxuICAgICAgICAgICAgd2Vla1N0YXJ0c09uU3VuZGF5OiBjb21wdXRlV2Vla1N0YXJ0RGF5KGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVwZWF0OiB7XG4gICAgICAgIC4uLmRhdGEucmVwZWF0LFxuICAgICAgICBmcmVxdWVuY3k6IGNvbXB1dGVGcmVxdWVuY3koZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICAgIHllYXJseToge1xuICAgICAgICAgIC4uLmRhdGEucmVwZWF0LnllYXJseSxcbiAgICAgICAgICBtb2RlOiBjb21wdXRlWWVhcmx5TW9kZShkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgbW9udGg6IGNvbXB1dGVZZWFybHlPbk1vbnRoKGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpLFxuICAgICAgICAgICAgZGF5OiBjb21wdXRlWWVhcmx5T25Nb250aGRheShkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVGhlOiB7XG4gICAgICAgICAgICBtb250aDogY29tcHV0ZVllYXJseU9uVGhlTW9udGgoZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICAgICAgICBkYXk6IGNvbXB1dGVZZWFybHlPblRoZU1vbnRoZGF5KGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpLFxuICAgICAgICAgICAgd2hpY2g6IGNvbXB1dGVZZWFybHlPblRoZVdoaWNoKGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1vbnRobHk6IHtcbiAgICAgICAgICAuLi5kYXRhLnJlcGVhdC5tb250aGx5LFxuICAgICAgICAgIG1vZGU6IGNvbXB1dGVNb250aGx5TW9kZShkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICBpbnRlcnZhbDogY29tcHV0ZU1vbnRobHlJbnRlcnZhbChkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgZGF5OiBjb21wdXRlTW9udGhseU9uRGF5KGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25UaGU6IHtcbiAgICAgICAgICAgIGRheTogY29tcHV0ZU1vbnRobHlPblRoZURheShkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICAgIHdoaWNoOiBjb21wdXRlTW9udGhseU9uVGhlV2hpY2goZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgd2Vla2x5OiB7XG4gICAgICAgICAgaW50ZXJ2YWw6IGNvbXB1dGVXZWVrbHlJbnRlcnZhbChkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICBkYXlzOiBjb21wdXRlV2Vla2x5RGF5cyhkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICB3ZWVrU3RhcnRzT25TdW5kYXk6IGNvbXB1dGVXZWVrU3RhcnREYXkoZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZGFpbHk6IHtcbiAgICAgICAgICBpbnRlcnZhbDogY29tcHV0ZURhaWx5SW50ZXJ2YWwoZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICAgIH0sXG4gICAgICAgIGhvdXJseToge1xuICAgICAgICAgIGludGVydmFsOiBjb21wdXRlSG91cmx5SW50ZXJ2YWwoZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZW5kOiB7XG4gICAgICAgIC4uLmRhdGEuZW5kLFxuICAgICAgICBtb2RlOiBjb21wdXRlRW5kTW9kZShkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgYWZ0ZXI6IGNvbXB1dGVFbmRBZnRlcihkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgb25EYXRlOiB7XG4gICAgICAgICAgZGF0ZTogZm9ybWF0RGF0ZShjb21wdXRlRW5kT25EYXRlKGRhdGEsIHJydWxlT3JpZ09wdGlvbnMpKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAuLi5kYXRhLmVuZC5vbkRhdGUub3B0aW9ucyxcbiAgICAgICAgICAgIHdlZWtTdGFydHNPblN1bmRheTogY29tcHV0ZVdlZWtTdGFydERheShkYXRhLCBycnVsZU9yaWdPcHRpb25zKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgLi4uZGF0YS5vcHRpb25zLFxuICAgICAgICB3ZWVrU3RhcnRzT25TdW5kYXk6IGNvbXB1dGVXZWVrU3RhcnREYXkoZGF0YSwgcnJ1bGVPcmlnT3B0aW9ucyksXG4gICAgICB9LFxuICAgICAgZXJyb3I6IG51bGwsXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IC4uLmRhdGEsIGVycm9yOiB7IHZhbHVlOiBycnVsZSwgbWVzc2FnZTogZSB9IH07XG4gIH1cblxuICByZXR1cm4gbmV3RGF0YU9iajtcbn07XG5cbiJdfQ==