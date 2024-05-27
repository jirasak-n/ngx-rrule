const computeYearlyOnTheWhich = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.byweekday) {
        return data.repeat.yearly.onThe.which;
    }
    const bysetpos = (typeof rruleObj.bysetpos === 'number') ? rruleObj.bysetpos : rruleObj.bysetpos[0];
    switch (bysetpos) {
        case 1: {
            return 'First';
        }
        case 2: {
            return 'Second';
        }
        case 3: {
            return 'Third';
        }
        case 4: {
            return 'Fourth';
        }
        case -1: {
            return 'Last';
        }
        default: {
            return data.repeat.yearly.onThe.which;
        }
    }
};
export default computeYearlyOnTheWhich;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZVllYXJseU9uVGhlV2hpY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi91dGlsL2NvbXB1dGVSUnVsZS9mcm9tU3RyaW5nL2NvbXB1dGVZZWFybHlPblRoZVdoaWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxJQUFTLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDM0QsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsT0FBTyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBHLFFBQVEsUUFBUSxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1IsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixlQUFlLHVCQUF1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29tcHV0ZVllYXJseU9uVGhlV2hpY2ggPSAoZGF0YTogYW55LCBycnVsZU9iajogYW55KSA9PiB7XG4gIGlmIChycnVsZU9iai5mcmVxICE9PSAwIHx8ICFycnVsZU9iai5ieXdlZWtkYXkpIHtcbiAgICByZXR1cm4gZGF0YS5yZXBlYXQueWVhcmx5Lm9uVGhlLndoaWNoO1xuICB9XG5cbiAgY29uc3QgYnlzZXRwb3MgPSAodHlwZW9mIHJydWxlT2JqLmJ5c2V0cG9zID09PSAnbnVtYmVyJykgPyBycnVsZU9iai5ieXNldHBvcyA6IHJydWxlT2JqLmJ5c2V0cG9zWzBdO1xuXG4gIHN3aXRjaCAoYnlzZXRwb3MpIHtcbiAgICBjYXNlIDE6IHtcbiAgICAgIHJldHVybiAnRmlyc3QnO1xuICAgIH1cbiAgICBjYXNlIDI6IHtcbiAgICAgIHJldHVybiAnU2Vjb25kJztcbiAgICB9XG4gICAgY2FzZSAzOiB7XG4gICAgICByZXR1cm4gJ1RoaXJkJztcbiAgICB9XG4gICAgY2FzZSA0OiB7XG4gICAgICByZXR1cm4gJ0ZvdXJ0aCc7XG4gICAgfVxuICAgIGNhc2UgLTE6IHtcbiAgICAgIHJldHVybiAnTGFzdCc7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBkYXRhLnJlcGVhdC55ZWFybHkub25UaGUud2hpY2g7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlWWVhcmx5T25UaGVXaGljaDtcbiJdfQ==