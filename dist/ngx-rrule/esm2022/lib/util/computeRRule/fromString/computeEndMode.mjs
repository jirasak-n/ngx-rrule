const computeEndMode = (data, rruleObj) => {
    if (rruleObj.count || rruleObj.count === 0) {
        return 'After';
    }
    if (rruleObj.until) {
        return 'On date';
    }
    return 'Never';
};
export default computeEndMode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZUVuZE1vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi91dGlsL2NvbXB1dGVSUnVsZS9mcm9tU3RyaW5nL2NvbXB1dGVFbmRNb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBUyxFQUFFLFFBQWEsRUFBRSxFQUFFO0lBQ2xELElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzNDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUYsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb21wdXRlRW5kTW9kZSA9IChkYXRhOiBhbnksIHJydWxlT2JqOiBhbnkpID0+IHtcbiAgaWYgKHJydWxlT2JqLmNvdW50IHx8IHJydWxlT2JqLmNvdW50ID09PSAwKSB7XG4gICAgcmV0dXJuICdBZnRlcic7XG4gIH1cblxuICBpZiAocnJ1bGVPYmoudW50aWwpIHtcbiAgICByZXR1cm4gJ09uIGRhdGUnO1xuICB9XG5cbiAgcmV0dXJuICdOZXZlcic7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlRW5kTW9kZTtcbiJdfQ==