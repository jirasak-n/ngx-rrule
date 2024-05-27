const computeYearlyOnMonthday = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.bymonthday) {
        return data.repeat.yearly.on.day;
    }
    if (typeof rruleObj.bymonthday === 'number') {
        return rruleObj.bymonthday;
    }
    return rruleObj.bymonthday[0];
};
export default computeYearlyOnMonthday;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZVllYXJseU9uTW9udGhkYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi91dGlsL2NvbXB1dGVSUnVsZS9mcm9tU3RyaW5nL2NvbXB1dGVZZWFybHlPbk1vbnRoZGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxJQUFTLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDM0QsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksT0FBTyxRQUFRLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzVDLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUM1QixDQUFDO0lBRUQsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUVGLGVBQWUsdUJBQXVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb21wdXRlWWVhcmx5T25Nb250aGRheSA9IChkYXRhOiBhbnksIHJydWxlT2JqOiBhbnkpID0+IHtcbiAgaWYgKHJydWxlT2JqLmZyZXEgIT09IDAgfHwgIXJydWxlT2JqLmJ5bW9udGhkYXkpIHtcbiAgICByZXR1cm4gZGF0YS5yZXBlYXQueWVhcmx5Lm9uLmRheTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcnJ1bGVPYmouYnltb250aGRheSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gcnJ1bGVPYmouYnltb250aGRheVxuICB9XG5cbiAgcmV0dXJuIHJydWxlT2JqLmJ5bW9udGhkYXlbMF07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlWWVhcmx5T25Nb250aGRheTtcbiJdfQ==