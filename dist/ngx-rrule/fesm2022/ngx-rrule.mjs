import * as i0 from '@angular/core';
import { Injectable, EventEmitter, forwardRef, Component, Output, Input, NgModule } from '@angular/core';
import { Weekday, RRule, rrulestr } from 'rrule';
import * as _ from 'lodash';
import * as i1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

const getDateParts = (date) => {
    return isValidDate(date) ? {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    } : {};
};
const isValidDate = (d) => {
    return !isNaN(d) && d instanceof Date;
};
const formatDate = (date) => {
    return date;
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
};

const computeStart = (date) => {
    let start = {};
    if (date) {
        if (!date.onDate || !isValidDate(date.onDate.date)) {
            start = new Date().setMilliseconds(0);
        }
        else {
            start = date.onDate.date;
        }
        const dateParts = getDateParts(start);
        if (!dateParts.year || !dateParts.month || !dateParts.day) {
            return null;
        }
        return {
            dtstart: new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0))
        };
    }
    return start;
};

const DATE_TIME_FORMAT = 'YYYY-MM-DD';
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Day',
    'Weekday',
    'Weekend day'
];

const computeYearlyOn = (on) => ({
    bymonth: MONTHS.indexOf(on.month) + 1,
    bymonthday: on.day,
});

const computeYearlyOnThe = (onThe) => {
    const repeat = {};
    switch (onThe.which) {
        case 'First':
            repeat.bysetpos = 1;
            break;
        case 'Second':
            repeat.bysetpos = 2;
            break;
        case 'Third':
            repeat.bysetpos = 3;
            break;
        case 'Fourth':
            repeat.bysetpos = 4;
            break;
        case 'Last':
            repeat.bysetpos = -1;
            break;
        default:
            break;
    }
    switch (onThe.day) {
        case 'Monday':
            repeat.byweekday = [0];
            break;
        case 'Tuesday':
            repeat.byweekday = [1];
            break;
        case 'Wednesday':
            repeat.byweekday = [2];
            break;
        case 'Thursday':
            repeat.byweekday = [3];
            break;
        case 'Friday':
            repeat.byweekday = [4];
            break;
        case 'Saturday':
            repeat.byweekday = [5];
            break;
        case 'Sunday':
            repeat.byweekday = [6];
            break;
        case 'Day':
            repeat.byweekday = [0, 1, 2, 3, 4, 5, 6];
            break;
        case 'Weekday':
            repeat.byweekday = [0, 1, 2, 3, 4];
            break;
        case 'Weekend day':
            repeat.byweekday = [5, 6];
            break;
        default:
            break;
    }
    if (repeat.byweekday && repeat.bysetpos) {
        repeat.byweekday = repeat.byweekday.map((r) => new Weekday(r, repeat.bysetpos));
    }
    repeat.bymonth = MONTHS.indexOf(onThe.month) + 1;
    return repeat;
};

const computeYearly = ({ mode, on, onThe }) => {
    if (on || onThe) {
        return {
            freq: RRule.YEARLY,
            ...(mode === 'on' ? computeYearlyOn(on) : computeYearlyOnThe(onThe))
        };
    }
    else {
        return {};
    }
};

const computeMonthlyOn = (on) => ({
    bymonthday: on.day,
});

const computeMonthlyOnThe = (onThe) => {
    let repeat = {};
    switch (onThe.which) {
        case 'First':
            repeat.bysetpos = 1;
            break;
        case 'Second':
            repeat.bysetpos = 2;
            break;
        case 'Third':
            repeat.bysetpos = 3;
            break;
        case 'Fourth':
            repeat.bysetpos = 4;
            break;
        case 'Last':
            repeat.bysetpos = -1;
            break;
        default:
            break;
    }
    switch (onThe.day) {
        case 'Monday':
            repeat.byweekday = [0];
            break;
        case 'Tuesday':
            repeat.byweekday = [1];
            break;
        case 'Wednesday':
            repeat.byweekday = [2];
            break;
        case 'Thursday':
            repeat.byweekday = [3];
            break;
        case 'Friday':
            repeat.byweekday = [4];
            break;
        case 'Saturday':
            repeat.byweekday = [5];
            break;
        case 'Sunday':
            repeat.byweekday = [6];
            break;
        case 'Day':
            repeat.byweekday = [0, 1, 2, 3, 4, 5, 6];
            break;
        case 'Weekday':
            repeat.byweekday = [0, 1, 2, 3, 4];
            break;
        case 'Weekend day':
            repeat.byweekday = [5, 6];
            break;
        default:
            break;
    }
    if (repeat.byweekday && repeat.bysetpos) {
        repeat.byweekday = repeat.byweekday.map((r) => new Weekday(r, repeat.bysetpos));
    }
    return repeat;
};

const computeMonthly = ({ mode, interval, on, onThe, }) => ({
    freq: RRule.MONTHLY,
    interval,
    ...(mode === 'on' ? computeMonthlyOn(on) : computeMonthlyOnThe(onThe)),
});

const computeWeekly = ({ interval, days }) => ({
    freq: RRule.WEEKLY,
    interval,
    byweekday: _.values(days).reduce((activeDays, isDayActive, dayIndex) => (isDayActive ? [...activeDays, dayIndex] : activeDays), []),
});

const computeDaily = (interval) => ({
    freq: RRule.DAILY,
    interval,
});

const computeHourly = (interval) => ({
    freq: RRule.HOURLY,
    interval,
});

const computeRepeat = ({ frequency, yearly, monthly, weekly, interval }) => {
    switch (frequency) {
        case 'Yearly': {
            return computeYearly(yearly);
        }
        case 'Monthly': {
            return computeMonthly(monthly);
        }
        case 'Weekly': {
            return computeWeekly(weekly);
        }
        case 'Daily': {
            return computeDaily(interval);
        }
        case 'Hourly': {
            return computeHourly(interval);
        }
        default:
            return {};
    }
};

const computeEnd = (attr) => {
    const end = {};
    if (attr) {
        const { mode, after } = attr;
        const date = attr.onDate.date;
        if (mode === 'After') {
            end.count = after;
        }
        if (mode === 'On date' && isValidDate(date)) {
            const dateParts = getDateParts(date);
            if (dateParts.month !== undefined) {
                end.until = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 23, 59, 59, 999));
            }
        }
    }
    return end;
};

const computeOptions = ({ hideStart, weekStartsOnSunday, tz }) => {
    const options = {};
    if (hideStart) {
        options.dtstart = null;
    }
    if (weekStartsOnSunday) {
        options.wkst = RRule.SU;
    }
    options.tzid = tz ? tz : Intl.DateTimeFormat().resolvedOptions().timeZone;
    return options;
};

const computeRRule$1 = ({ start, repeat, end, options, }) => {
    const rruleObject = {
        ...computeStart(start),
        ...computeRepeat(repeat),
        ...computeEnd(end),
        ...computeOptions(options),
    };
    const rrule = new RRule(rruleObject);
    return rrule;
};

class NgxRruleService {
    constructor() {
    }
    computeRRule(params) {
        return computeRRule$1(params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

const computeStartOnDate = (data, rruleObj) => {
    if (!rruleObj.dtstart) {
        return data.start.onDate.date;
    }
    return rruleObj.dtstart;
};

const computeFrequency = (data, rruleObj) => {
    switch (rruleObj.freq) {
        case 0: {
            return 'Yearly';
        }
        case 1: {
            return 'Monthly';
        }
        case 2: {
            return 'Weekly';
        }
        case 3: {
            return 'Daily';
        }
        case 4: {
            return 'Hourly';
        }
        default: {
            return data.repeat.frequency;
        }
    }
};

const computeYearlyMode = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.bymonth) {
        return data.repeat.yearly.mode;
    }
    if (rruleObj.bymonthday) {
        return 'on';
    }
    return 'on the';
};

const computeYearlyOnMonth = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.bymonthday) {
        return data.repeat.yearly.on.month;
    }
    if (typeof rruleObj.bymonth === 'number') {
        return MONTHS[rruleObj.bymonth - 1];
    }
    return MONTHS[rruleObj.bymonth[0] - 1];
};

const computeYearlyOnMonthday = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.bymonthday) {
        return data.repeat.yearly.on.day;
    }
    if (typeof rruleObj.bymonthday === 'number') {
        return rruleObj.bymonthday;
    }
    return rruleObj.bymonthday[0];
};

const computeYearlyOnTheMonth = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.byweekday) {
        return data.repeat.yearly.onThe.month;
    }
    if (typeof rruleObj.bymonth === 'number') {
        return MONTHS[rruleObj.bymonth - 1];
    }
    return MONTHS[rruleObj.bymonth[0] - 1];
};

const computeYearlyOnTheMonthday = (data, rruleObj) => {
    if (rruleObj.freq !== 0 || !rruleObj.byweekday) {
        return data.repeat.yearly.onThe.day;
    }
    const weekdays = rruleObj.byweekday.map((weekday) => weekday.weekday).join(',');
    switch (weekdays) {
        case '0': {
            return 'Monday';
        }
        case '1': {
            return 'Tuesday';
        }
        case '2': {
            return 'Wednesday';
        }
        case '3': {
            return 'Thursday';
        }
        case '4': {
            return 'Friday';
        }
        case '5': {
            return 'Saturday';
        }
        case '6': {
            return 'Sunday';
        }
        case '0,1,2,3,4,5,6': {
            return 'Day';
        }
        case '0,1,2,3,4': {
            return 'Weekday';
        }
        case '5,6': {
            return 'Weekend day';
        }
        default: {
            return data.repeat.yearly.onThe.day;
        }
    }
};

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

const computeMonthlyMode = (data, rruleObj) => {
    if (rruleObj.freq !== 1) {
        return data.repeat.monthly.mode;
    }
    if (rruleObj.bymonthday) {
        return 'on';
    }
    return 'on the';
};

const computeMonthlyInterval = (data, rruleObj) => {
    if (rruleObj.freq !== 1) {
        return data.repeat.monthly.interval;
    }
    return rruleObj.interval;
};

const computeMonthlyOnDay = (data, rruleObj) => {
    if (rruleObj.freq !== 1 || !rruleObj.bymonthday) {
        return data.repeat.monthly.on.day;
    }
    if (typeof rruleObj.bymonthday === 'number') {
        return rruleObj.bymonthday;
    }
    return rruleObj.bymonthday[0];
};

const computeMonthlyOnTheDay = (data, rruleObj) => {
    if (rruleObj.freq !== 1 || !rruleObj.byweekday) {
        return data.repeat.monthly.onThe.day;
    }
    const weekdays = rruleObj.byweekday.map((weekday) => weekday.weekday).join(',');
    switch (weekdays) {
        case '0': {
            return 'Monday';
        }
        case '1': {
            return 'Tuesday';
        }
        case '2': {
            return 'Wednesday';
        }
        case '3': {
            return 'Thursday';
        }
        case '4': {
            return 'Friday';
        }
        case '5': {
            return 'Saturday';
        }
        case '6': {
            return 'Sunday';
        }
        case '0,1,2,3,4,5,6': {
            return 'Day';
        }
        case '0,1,2,3,4': {
            return 'Weekday';
        }
        case '5,6': {
            return 'Weekend day';
        }
        default: {
            return data.repeat.monthly.onThe.day;
        }
    }
};

const computeMonthlyOnTheWhich = (data, rruleObj) => {
    if (rruleObj.freq !== 1 || !rruleObj.bysetpos) {
        return data.repeat.monthly.onThe.which;
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
            return data.repeat.monthly.onThe.which;
        }
    }
};

const computeWeeklyInterval = (data, rruleObj) => {
    if (rruleObj.freq !== 2) {
        return data.repeat.weekly.interval;
    }
    return rruleObj.interval;
};

const computeWeeklyDays = (data, rruleObj) => {
    let weekdays = [];
    if (rruleObj.freq !== 2) {
        return data.repeat.weekly.days;
    }
    if (rruleObj.byweekday) {
        weekdays = rruleObj.byweekday.map((weekday) => weekday.weekday);
    }
    return {
        mon: weekdays.includes(0),
        tue: weekdays.includes(1),
        wed: weekdays.includes(2),
        thu: weekdays.includes(3),
        fri: weekdays.includes(4),
        sat: weekdays.includes(5),
        sun: weekdays.includes(6),
    };
};

const computeWeekStartDay = (data, rruleObj) => {
    if (!rruleObj.wkst) {
        return data.options.weekStartsOnSunday;
    }
    return rruleObj.wkst === 6;
};

const computeDailyInterval = (data, rruleObj) => {
    if (rruleObj.freq !== 3) {
        return data.repeat.daily.interval;
    }
    return rruleObj.interval;
};

const computeHourlyInterval = (data, rruleObj) => {
    if (rruleObj.freq !== 4) {
        return data.repeat.daily.interval;
    }
    return rruleObj.interval;
};

const computeEndMode = (data, rruleObj) => {
    if (rruleObj.count || rruleObj.count === 0) {
        return 'After';
    }
    if (rruleObj.until) {
        return 'On date';
    }
    return 'Never';
};

const computeEndAfter = (data, rruleObj) => {
    if (!rruleObj.count && rruleObj.count !== 0) {
        return data.end.after;
    }
    return rruleObj.count;
};

const computeEndOnDate = (data, rruleObj) => {
    if (!rruleObj.until) {
        return data.end.onDate.date;
    }
    return rruleObj.until;
};

const computeRRule = (data, rrule) => {
    if (!rrule) {
        return data;
    }
    let newDataObj;
    try {
        const rruleOrigOptions = rrulestr(rrule).origOptions;
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

class StartComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onChange = new EventEmitter();
        this.writeValue = (input) => {
            this.form.patchValue({
                startDate: new Date(input.onDate.date)
            });
        };
        this.onFormChange = () => {
            if (this.propagateChange) {
                this.propagateChange({
                    onDate: {
                        date: new Date(this.form.value.startDate)
                    }
                });
            }
            this.onChange.emit();
        };
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            startDate: ''
        });
        setTimeout(() => {
            this.form.valueChanges.subscribe(() => {
                this.onFormChange();
            });
            this.onFormChange();
        }, 100);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: StartComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: StartComponent, selector: "ngx-start", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StartComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"form\" class=\"form-inline\">\n  <label for=\"inlineFormInputName2\" class=\"mr-1\">Start</label>\n  <input type=\"text\" class=\"form-control mb-2 mr-sm-2\" id=\"inlineFormInputName2\" formControlName=\"startDate\" placeholder=\"Start Date\"\n         name=\"dp\" ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\">\n</form>\n", styles: [""], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i2.NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: StartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-start', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StartComponent), multi: true }], template: "<form [formGroup]=\"form\" class=\"form-inline\">\n  <label for=\"inlineFormInputName2\" class=\"mr-1\">Start</label>\n  <input type=\"text\" class=\"form-control mb-2 mr-sm-2\" id=\"inlineFormInputName2\" formControlName=\"startDate\" placeholder=\"Start Date\"\n         name=\"dp\" ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\">\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });

class EndComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onChange = new EventEmitter();
        this.writeValue = (input) => {
            this.form.patchValue({
                ...input,
                endAt: new Date(input.onDate.date)
            });
        };
        this.onFormChange = () => {
            const endAt = this.form.value.endAt;
            const param = {
                ...this.form.value,
                onDate: {
                    date: endAt
                }
            };
            this.propagateChange(param);
            this.onChange.emit();
        };
        this.radioChange = (event) => {
            if (event.target.value === 'on the') {
                this.form.patchValue({
                    onDay: '',
                });
            }
            else {
                this.form.patchValue({
                    onTheWhich: '',
                    onTheDay: ''
                });
            }
            this.onFormChange();
        };
        this.range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        const dateObj = new Date();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        this.form = this.formBuilder.group({
            after: 1,
            endAt: { month, day, year },
            mode: 'Never'
        });
        setTimeout(() => {
            this.form.valueChanges.subscribe(() => {
                this.onFormChange();
            });
            this.onFormChange();
        }, 100);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: EndComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: EndComponent, selector: "ngx-end", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EndComponent), multi: true }], ngImport: i0, template: "\n<form [formGroup]=\"form\" class=\"form-inline\">\n  <div class=\"row\">\n    <div class=\"form-group col-lg-12\">\n      <label class=\"mr-2\">Ends</label>\n      <select  formControlName=\"mode\" class=\"form-control\">\n        <option value=\"Never\">Never</option>\n        <option value=\"After\">After</option>\n        <option value=\"On date\">On date</option>\n      </select>\n      <div *ngIf=\"form.value.mode === 'After'\">\n        <div class=\"form-group m-0 row d-flex align-items-center\">\n          <input formControlName=\"after\"  aria-label=\"End after\"\n                 class=\"form-control ml-2\" />\n          <label class=\"ml-1\">occurrences</label>\n        </div>\n      </div>\n      <input  *ngIf=\"form.value.mode == 'On date'\" class=\"form-control ml-2\" formControlName=\"endAt\" placeholder=\"yyyy-mm-dd\"\n              ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\">\n    </div>\n  </div>\n</form>\n\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i2.NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: EndComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-end', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EndComponent), multi: true }], template: "\n<form [formGroup]=\"form\" class=\"form-inline\">\n  <div class=\"row\">\n    <div class=\"form-group col-lg-12\">\n      <label class=\"mr-2\">Ends</label>\n      <select  formControlName=\"mode\" class=\"form-control\">\n        <option value=\"Never\">Never</option>\n        <option value=\"After\">After</option>\n        <option value=\"On date\">On date</option>\n      </select>\n      <div *ngIf=\"form.value.mode === 'After'\">\n        <div class=\"form-group m-0 row d-flex align-items-center\">\n          <input formControlName=\"after\"  aria-label=\"End after\"\n                 class=\"form-control ml-2\" />\n          <label class=\"ml-1\">occurrences</label>\n        </div>\n      </div>\n      <input  *ngIf=\"form.value.mode == 'On date'\" class=\"form-control ml-2\" formControlName=\"endAt\" placeholder=\"yyyy-mm-dd\"\n              ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\">\n    </div>\n  </div>\n</form>\n\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });

class WeeklyComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onChange = new EventEmitter();
        this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.writeValue = (input) => {
            this.weeklyForm.patchValue({ ...input.days, weeklyInterval: input.interval });
        };
        this.onFormChange = () => {
            if (this.propagateChange) {
                const value = {
                    interval: 0,
                    days: []
                };
                value.interval = this.weeklyForm.value.weeklyInterval;
                value.days = _.omit(this.weeklyForm.value, ['weeklyInterval']);
                this.propagateChange(value);
                this.onChange.emit();
            }
        };
        this.weeklyForm = this.formBuilder.group({});
    }
    ngOnInit() {
        this.weeklyForm = this.formBuilder.group({
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
            weeklyInterval: 0,
        });
        this.weeklyForm.valueChanges.subscribe(() => {
            this.onFormChange();
        });
        setTimeout(() => {
            this.onFormChange();
        }, 100);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: WeeklyComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: WeeklyComponent, selector: "ngx-weekly", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeeklyComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"weeklyForm\">\n  <div class=\"btn-group btn-group-toggle\">\n    <label class=\"btn-outline-primary btn-circle mr-2\" ngbButtonLabel  *ngFor=\"let day of days\">\n      <input type=\"checkbox\" [formControlName]=\"day.toLowerCase()\" ngbButton> {{day}}\n    </label>\n  </div>\n</form>\n", styles: [".btn-circle{width:30px;height:30px;padding:6px 0;border-radius:15px!important;text-align:center;font-size:12px;line-height:1.42857}\n"], dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: WeeklyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-weekly', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeeklyComponent), multi: true }], template: "<form [formGroup]=\"weeklyForm\">\n  <div class=\"btn-group btn-group-toggle\">\n    <label class=\"btn-outline-primary btn-circle mr-2\" ngbButtonLabel  *ngFor=\"let day of days\">\n      <input type=\"checkbox\" [formControlName]=\"day.toLowerCase()\" ngbButton> {{day}}\n    </label>\n  </div>\n</form>\n", styles: [".btn-circle{width:30px;height:30px;padding:6px 0;border-radius:15px!important;text-align:center;font-size:12px;line-height:1.42857}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });

class MonthlyComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onChange = new EventEmitter();
        this.writeValue = (input) => {
            this.form.patchValue(input);
        };
        this.onFormChange = () => {
            if (this.propagateChange) {
                this.propagateChange(this.form.value);
            }
            this.onChange.emit();
        };
        this.radioChange = (event) => {
            if (event.target.value === 'on the') {
                this.form.patchValue({
                    onDay: '',
                });
            }
            else {
                this.form.patchValue({
                    onTheWhich: '',
                    onTheDay: ''
                });
            }
            this.onFormChange();
        };
        this.range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            interval: 0,
            mode: 'on',
            on: this.formBuilder.group({
                day: '1'
            }),
            onThe: this.formBuilder.group({
                which: 'First',
                day: 'Monday'
            }),
        });
        this.form.valueChanges.subscribe(() => {
            this.onFormChange();
        });
        setTimeout(() => {
            this.onFormChange();
        }, 100);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: MonthlyComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: MonthlyComponent, selector: "ngx-monthly", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MonthlyComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"form\">\n  <div class=\"row col form-inline\">\n    <input type=\"radio\" class=\"mr-sm-2\" formControlName=\"mode\"\n           aria-label=\"Repeat monthly on\" value=\"on\" checked (change)=\"radioChange($event)\" >\n    <label class=\"ml-2 mr-2\">on day</label>\n    <div formGroupName=\"on\">\n      <select aria-label=\"Repeat monthly on a day\" formControlName=\"day\" [attr.disabled]=\"form.value.mode !== 'on'? '' : null\"\n              class=\"form-control mb-2 mr-sm-2\">\n        <option *ngFor=\"let val of range(1, 32)\" [value]=\"val\">{{val}}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"row form-inline\">\n    <div class=\"form-group col-lg-12\">\n      <input type=\"radio\" class=\"mb-2 mr-sm-2\" formControlName=\"mode\"\n             aria-label=\"Repeat monthly on\" value=\"on the\" checked (change)=\"radioChange($event)\" >\n      <label class=\"ml-2 mr-2\">on the</label>\n      <div formGroupName=\"onThe\">\n        <select formControlName=\"which\"\n                aria-label=\"Repeat monthly on the which\" class=\"form-control mb-2 mr-sm-2\" [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"First\">First</option>\n          <option value=\"Second\">Second</option>\n          <option value=\"Third\">Third</option>\n          <option value=\"Fourth\">Fourth</option>\n          <option value=\"Last\">Last</option>\n        </select>\n        <select formControlName=\"day\" aria-label=\"Repeat monthly on the day\" class=\"form-control mb-2 mr-sm-2\"  [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"Monday\">Monday</option>\n          <option value=\"Tuesday\">Tuesday</option>\n          <option value=\"Wednesday\">Wednesday</option>\n          <option value=\"Thursday\">Thursday</option>\n          <option value=\"Friday\">Friday</option>\n          <option value=\"Saturday\">Saturday</option>\n          <option value=\"Sunday\">Sunday</option>\n          <option value=\"Day\">Day</option>\n          <option value=\"Weekday\">Weekday</option>\n          <option value=\"Weekend day\">Weekend day</option>\n        </select>\n      </div>\n    </div>\n  </div>\n</form>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: MonthlyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-monthly', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MonthlyComponent), multi: true }], template: "<form [formGroup]=\"form\">\n  <div class=\"row col form-inline\">\n    <input type=\"radio\" class=\"mr-sm-2\" formControlName=\"mode\"\n           aria-label=\"Repeat monthly on\" value=\"on\" checked (change)=\"radioChange($event)\" >\n    <label class=\"ml-2 mr-2\">on day</label>\n    <div formGroupName=\"on\">\n      <select aria-label=\"Repeat monthly on a day\" formControlName=\"day\" [attr.disabled]=\"form.value.mode !== 'on'? '' : null\"\n              class=\"form-control mb-2 mr-sm-2\">\n        <option *ngFor=\"let val of range(1, 32)\" [value]=\"val\">{{val}}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"row form-inline\">\n    <div class=\"form-group col-lg-12\">\n      <input type=\"radio\" class=\"mb-2 mr-sm-2\" formControlName=\"mode\"\n             aria-label=\"Repeat monthly on\" value=\"on the\" checked (change)=\"radioChange($event)\" >\n      <label class=\"ml-2 mr-2\">on the</label>\n      <div formGroupName=\"onThe\">\n        <select formControlName=\"which\"\n                aria-label=\"Repeat monthly on the which\" class=\"form-control mb-2 mr-sm-2\" [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"First\">First</option>\n          <option value=\"Second\">Second</option>\n          <option value=\"Third\">Third</option>\n          <option value=\"Fourth\">Fourth</option>\n          <option value=\"Last\">Last</option>\n        </select>\n        <select formControlName=\"day\" aria-label=\"Repeat monthly on the day\" class=\"form-control mb-2 mr-sm-2\"  [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"Monday\">Monday</option>\n          <option value=\"Tuesday\">Tuesday</option>\n          <option value=\"Wednesday\">Wednesday</option>\n          <option value=\"Thursday\">Thursday</option>\n          <option value=\"Friday\">Friday</option>\n          <option value=\"Saturday\">Saturday</option>\n          <option value=\"Sunday\">Sunday</option>\n          <option value=\"Day\">Day</option>\n          <option value=\"Weekday\">Weekday</option>\n          <option value=\"Weekend day\">Weekend day</option>\n        </select>\n      </div>\n    </div>\n  </div>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });

class YearlyComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onChange = new EventEmitter();
        this.writeValue = (input) => {
            this.form.patchValue(input);
        };
        this.onFormChange = () => {
            if (this.propagateChange) {
                this.propagateChange(this.form.value);
            }
            this.onChange.emit();
        };
        this.range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            interval: 0,
            mode: 'on',
            on: this.formBuilder.group({
                month: 'Jan',
                day: 1
            }),
            onThe: this.formBuilder.group({
                month: 'Jan',
                day: 'Monday',
                which: 'First'
            })
        });
        this.form.valueChanges.subscribe(() => {
            this.onFormChange();
        });
        setTimeout(() => {
            this.onFormChange();
        }, 100);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: YearlyComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: YearlyComponent, selector: "ngx-yearly", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => YearlyComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"form\">\n    <div class=\"row mt-2\">\n      <div class=\"form-inline\">\n        <div class=\"form-group col-lg-12\">\n          <input type=\"radio\" aria-label=\"Repeat yearly on\" value=\"on\" formControlName=\"mode\">\n          <label class=\"ml-2\">on</label>\n          <div  formGroupName=\"on\">\n            <select formControlName=\"month\" aria-label=\"Repeat yearly on month\" class=\"form-control\"\n                    [attr.disabled]=\"form.value.mode !== 'on'? '' : null\">\n              <option value=\"Jan\">Jan</option>\n              <option value=\"Feb\">Feb</option>\n              <option value=\"Mar\">Mar</option>\n              <option value=\"Apr\">Apr</option>\n              <option value=\"May\">May</option>\n              <option value=\"Jun\">Jun</option>\n              <option value=\"Jul\">Jul</option>\n              <option value=\"Aug\">Aug</option>\n              <option value=\"Sep\">Sep</option>\n              <option value=\"Oct\">Oct</option>\n              <option value=\"Nov\">Nov</option>\n              <option value=\"Dec\">Dec</option>\n            </select>\n            <select formControlName=\"day\" aria-label=\"Repeat yearly on a day\" class=\"form-control\"\n                    [attr.disabled]=\"form.value.mode !== 'on'? '' : null\">\n              <option *ngFor=\"let val of range(1, 32)\" [value]=\"val.toString()\">{{val}}</option>\n            </select>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  <div class=\"row mt-2\">\n    <div class=\"form-inline\">\n      <div class=\"col-md-12 form-group\">\n        <input type=\"radio\" value=\"on the\" formControlName=\"mode\">\n        <label class=\"ml-2\">on the</label>\n        <div formGroupName=\"onThe\">\n        <select formControlName=\"which\" aria-label=\"Repeat yearly on the which\" class=\"form-control\"\n                [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"First\">First</option>\n          <option value=\"Second\">Second</option>\n          <option value=\"Third\">Third</option>\n          <option value=\"Fourth\">Fourth</option>\n          <option value=\"Last\">Last</option>\n        </select>\n\n        <select  formControlName=\"day\" aria-label=\"Repeat yearly on the day\" class=\"form-control\"\n                [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"Monday\">Monday</option>\n          <option value=\"Tuesday\">Tuesday</option>\n          <option value=\"Wednesday\">Wednesday</option>\n          <option value=\"Thursday\">Thursday</option>\n          <option value=\"Friday\">Friday</option>\n          <option value=\"Saturday\">Saturday</option>\n          <option value=\"Sunday\">Sunday</option>\n          <option value=\"Day\">Day</option>\n          <option value=\"Weekday\">Weekday</option>\n          <option value=\"Weekend day\">Weekend day</option>\n        </select>\n        </div>\n        <label class=\"ml-1 mr-1\">of</label>\n        <div formGroupName=\"onThe\">\n        <select  formControlName=\"month\" aria-label=\"Repeat yearly on the month\" class=\"form-control\"\n                [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"Jan\">Jan</option>\n          <option value=\"Feb\">Feb</option>\n          <option value=\"Mar\">Mar</option>\n          <option value=\"Apr\">Apr</option>\n          <option value=\"May\">May</option>\n          <option value=\"Jun\">Jun</option>\n          <option value=\"Jul\">Jul</option>\n          <option value=\"Aug\">Aug</option>\n          <option value=\"Sep\">Sep</option>\n          <option value=\"Oct\">Oct</option>\n          <option value=\"Nov\">Nov</option>\n          <option value=\"Dec\">Dec</option>\n        </select>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: YearlyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-yearly', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => YearlyComponent), multi: true }], template: "<form [formGroup]=\"form\">\n    <div class=\"row mt-2\">\n      <div class=\"form-inline\">\n        <div class=\"form-group col-lg-12\">\n          <input type=\"radio\" aria-label=\"Repeat yearly on\" value=\"on\" formControlName=\"mode\">\n          <label class=\"ml-2\">on</label>\n          <div  formGroupName=\"on\">\n            <select formControlName=\"month\" aria-label=\"Repeat yearly on month\" class=\"form-control\"\n                    [attr.disabled]=\"form.value.mode !== 'on'? '' : null\">\n              <option value=\"Jan\">Jan</option>\n              <option value=\"Feb\">Feb</option>\n              <option value=\"Mar\">Mar</option>\n              <option value=\"Apr\">Apr</option>\n              <option value=\"May\">May</option>\n              <option value=\"Jun\">Jun</option>\n              <option value=\"Jul\">Jul</option>\n              <option value=\"Aug\">Aug</option>\n              <option value=\"Sep\">Sep</option>\n              <option value=\"Oct\">Oct</option>\n              <option value=\"Nov\">Nov</option>\n              <option value=\"Dec\">Dec</option>\n            </select>\n            <select formControlName=\"day\" aria-label=\"Repeat yearly on a day\" class=\"form-control\"\n                    [attr.disabled]=\"form.value.mode !== 'on'? '' : null\">\n              <option *ngFor=\"let val of range(1, 32)\" [value]=\"val.toString()\">{{val}}</option>\n            </select>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  <div class=\"row mt-2\">\n    <div class=\"form-inline\">\n      <div class=\"col-md-12 form-group\">\n        <input type=\"radio\" value=\"on the\" formControlName=\"mode\">\n        <label class=\"ml-2\">on the</label>\n        <div formGroupName=\"onThe\">\n        <select formControlName=\"which\" aria-label=\"Repeat yearly on the which\" class=\"form-control\"\n                [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"First\">First</option>\n          <option value=\"Second\">Second</option>\n          <option value=\"Third\">Third</option>\n          <option value=\"Fourth\">Fourth</option>\n          <option value=\"Last\">Last</option>\n        </select>\n\n        <select  formControlName=\"day\" aria-label=\"Repeat yearly on the day\" class=\"form-control\"\n                [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"Monday\">Monday</option>\n          <option value=\"Tuesday\">Tuesday</option>\n          <option value=\"Wednesday\">Wednesday</option>\n          <option value=\"Thursday\">Thursday</option>\n          <option value=\"Friday\">Friday</option>\n          <option value=\"Saturday\">Saturday</option>\n          <option value=\"Sunday\">Sunday</option>\n          <option value=\"Day\">Day</option>\n          <option value=\"Weekday\">Weekday</option>\n          <option value=\"Weekend day\">Weekend day</option>\n        </select>\n        </div>\n        <label class=\"ml-1 mr-1\">of</label>\n        <div formGroupName=\"onThe\">\n        <select  formControlName=\"month\" aria-label=\"Repeat yearly on the month\" class=\"form-control\"\n                [attr.disabled]=\"form.value.mode === 'on'? '' : null\">\n          <option value=\"Jan\">Jan</option>\n          <option value=\"Feb\">Feb</option>\n          <option value=\"Mar\">Mar</option>\n          <option value=\"Apr\">Apr</option>\n          <option value=\"May\">May</option>\n          <option value=\"Jun\">Jun</option>\n          <option value=\"Jul\">Jul</option>\n          <option value=\"Aug\">Aug</option>\n          <option value=\"Sep\">Sep</option>\n          <option value=\"Oct\">Oct</option>\n          <option value=\"Nov\">Nov</option>\n          <option value=\"Dec\">Dec</option>\n        </select>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });

class RepeatComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onChange = new EventEmitter();
        this.frequency = 'Weekly';
        this.writeValue = (input) => {
            this.form.patchValue({ ...input, interval: input[input.frequency.toLowerCase()].interval });
        };
        this.onFormChange = () => {
            const params = {
                ...this.form.value
            };
            params[this.form.value.frequency.toLowerCase()].interval = this.form.value.interval;
            if (this.propagateChange) {
                this.propagateChange(params);
            }
            this.onChange.emit();
        };
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            yearly: {},
            monthly: {},
            weekly: {},
            hourly: {},
            daily: {},
            interval: 1,
            frequency: 'Weekly'
        });
        this.form.valueChanges.subscribe(() => {
            this.onFormChange();
        });
        setTimeout(() => {
            this.onFormChange();
        }, 100);
    }
    onOptionChange() {
        this.form.patchValue({
            yearly: {
                mode: 'on',
                on: {
                    month: 'Jan',
                    day: '1'
                },
                onThe: {
                    which: 'First',
                    day: 'Monday',
                    month: 'Jan'
                }
            },
            monthly: {
                mode: 'on',
                on: {
                    day: 1
                },
                onThe: {
                    which: 'First',
                    day: 'Monday'
                }
            },
            weekly: {
                interval: 1,
                days: {
                    mon: false,
                    tue: false,
                    wed: false,
                    thu: false,
                    fri: false,
                    sat: false,
                    sun: false,
                }
            },
            hourly: {
                interval: 1
            },
            daily: {
                interval: 1
            }
        });
        this.onFormChange();
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: RepeatComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: RepeatComponent, selector: "ngx-repeat", inputs: { frequency: "frequency" }, outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RepeatComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"form\">\n  <div class=\"row col-lg-12 form-inline\">\n    <label class=\"mr-2\">Repeat every</label>\n    <input aria-label=\"Repeat interval\" class=\"form-control w-25\" value=\"1\" formControlName=\"interval\">\n\n    <select formControlName=\"frequency\" (change)=\"onOptionChange()\" class=\"form-control mt-md-0 mt-sm-2\">\n      <option value=\"Yearly\" *ngIf=\"!frequency || frequency.indexOf('Yearly') !== -1\">Year</option>\n      <option value=\"Monthly\" *ngIf=\"!frequency || frequency.indexOf('Monthly') !== -1\">Month</option>\n      <option value=\"Weekly\" *ngIf=\"!frequency || frequency.indexOf('Weekly') !== -1\">Week</option>\n      <option value=\"Daily\" *ngIf=\"!frequency || frequency.indexOf('Daily') !== -1\">Day</option>\n      <option value=\"Hourly\" *ngIf=\"!frequency || frequency.indexOf('Hourly') !== -1\">Hour</option>\n    </select>\n\n  </div>\n  <div class=\"row col mt-1 mb-1\">\n    <ngx-yearly *ngIf=\"form.value.frequency === 'Yearly'\" formControlName=\"yearly\"></ngx-yearly>\n    <ngx-monthly *ngIf=\"form.value.frequency === 'Monthly'\" formControlName=\"monthly\"></ngx-monthly>\n    <ngx-weekly *ngIf=\"form.value.frequency === 'Weekly'\" formControlName=\"weekly\"></ngx-weekly>\n  </div>\n</form>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: WeeklyComponent, selector: "ngx-weekly", outputs: ["onChange"] }, { kind: "component", type: MonthlyComponent, selector: "ngx-monthly", outputs: ["onChange"] }, { kind: "component", type: YearlyComponent, selector: "ngx-yearly", outputs: ["onChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: RepeatComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-repeat', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RepeatComponent), multi: true }], template: "<form [formGroup]=\"form\">\n  <div class=\"row col-lg-12 form-inline\">\n    <label class=\"mr-2\">Repeat every</label>\n    <input aria-label=\"Repeat interval\" class=\"form-control w-25\" value=\"1\" formControlName=\"interval\">\n\n    <select formControlName=\"frequency\" (change)=\"onOptionChange()\" class=\"form-control mt-md-0 mt-sm-2\">\n      <option value=\"Yearly\" *ngIf=\"!frequency || frequency.indexOf('Yearly') !== -1\">Year</option>\n      <option value=\"Monthly\" *ngIf=\"!frequency || frequency.indexOf('Monthly') !== -1\">Month</option>\n      <option value=\"Weekly\" *ngIf=\"!frequency || frequency.indexOf('Weekly') !== -1\">Week</option>\n      <option value=\"Daily\" *ngIf=\"!frequency || frequency.indexOf('Daily') !== -1\">Day</option>\n      <option value=\"Hourly\" *ngIf=\"!frequency || frequency.indexOf('Hourly') !== -1\">Hour</option>\n    </select>\n\n  </div>\n  <div class=\"row col mt-1 mb-1\">\n    <ngx-yearly *ngIf=\"form.value.frequency === 'Yearly'\" formControlName=\"yearly\"></ngx-yearly>\n    <ngx-monthly *ngIf=\"form.value.frequency === 'Monthly'\" formControlName=\"monthly\"></ngx-monthly>\n    <ngx-weekly *ngIf=\"form.value.frequency === 'Weekly'\" formControlName=\"weekly\"></ngx-weekly>\n  </div>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }], frequency: [{
                type: Input
            }] } });

class NgxRruleComponent {
    constructor(formBuilder, service) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.hideStart = false;
        this.hideEnd = false;
        this.writeValue = (input) => {
            const config = {};
            const configureFrequency = () => (config.repeat ? config.repeat[0] : 'Yearly');
            const configureYearly = () => (config.yearly || 'on');
            const configureMonthly = () => (config.monthly || 'on');
            const configureEnd = () => (config.end ? config.end[0] : 'Never');
            const configureHideStart = () => (typeof config.hideStart === 'undefined' ? true : config.hideStart);
            // const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;
            const init_data = {
                start: {
                    onDate: {
                        date: formatDate(new Date()),
                        options: {},
                    },
                },
                repeat: {
                    frequency: configureFrequency(),
                    yearly: {
                        mode: configureYearly(),
                        on: {
                            month: 'Jan',
                            day: 1,
                        },
                        onThe: {
                            month: 'Jan',
                            day: 'Monday',
                            which: 'First',
                        },
                        options: {
                        // modes: config.yearly,
                        },
                    },
                    monthly: {
                        mode: configureMonthly(),
                        interval: 1,
                        on: {
                            day: 1,
                        },
                        onThe: {
                            day: 'Monday',
                            which: 'First',
                        },
                        options: {
                        // modes: config.monthly,
                        },
                    },
                    weekly: {
                        interval: 1,
                        days: {
                            mon: false,
                            tue: false,
                            wed: false,
                            thu: false,
                            fri: false,
                            sat: false,
                            sun: false,
                        },
                        options: {
                        // weekStartsOnSunday: config.weekStartsOnSunday,
                        },
                    },
                    daily: {
                        interval: 1,
                    },
                    hourly: {
                        interval: 1,
                    },
                    options: {
                    // frequency: config.repeat,
                    },
                },
                end: {
                    mode: configureEnd(),
                    after: 1,
                    onDate: {
                        date: formatDate(new Date()),
                        options: {
                        // weekStartsOnSunday: config.weekStartsOnSunday,
                        // calendarComponent,
                        },
                    },
                    options: {
                        modes: config.end,
                    },
                },
                options: {
                    hideStart: configureHideStart(),
                    hideEnd: config.hideEnd,
                    hideError: config.hideError,
                    weekStartsOnSunday: config.weekStartsOnSunday,
                },
                error: null,
            };
            const data = computeRRule(init_data, input);
            this.form.patchValue(data);
        };
        this.onFormChange = () => {
            let rRule;
            try {
                const params = this.form.value;
                if (this.hideStart && !this.startAt) {
                    params.start = null;
                }
                if (this.hideEnd && !this.endAt) {
                    params.end = null;
                }
                rRule = this.service.computeRRule({ ...params, options: { tz: this.tz } });
            }
            catch (err) {
                console.error(err);
            }
            if (this.propagateChange) {
                this.propagateChange({
                    raw: this.form.value,
                    rRule
                });
            }
        };
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        const params = {
            start: {},
            repeat: {},
            end: {
                mode: 'Never'
            }
        };
        if (this.endAt) {
            params.end = {
                mode: 'On date',
                onDate: {
                    date: getDateParts(this.endAt)
                }
            };
        }
        if (this.startAt) {
            params.start = {
                onDate: {
                    date: getDateParts(this.startAt)
                }
            };
        }
        this.form = this.formBuilder.group(params);
        this.form.valueChanges.subscribe(() => setTimeout(() => {
            this.onFormChange();
        }, 100));
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    ngOnChanges(changes) {
        setTimeout(() => {
            this.onFormChange();
        }, 10);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleComponent, deps: [{ token: i1.FormBuilder }, { token: NgxRruleService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: NgxRruleComponent, selector: "ngx-rrule", inputs: { hideStart: "hideStart", hideEnd: "hideEnd", startAt: "startAt", endAt: "endAt", frequency: "frequency", tz: "tz" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"form\">\n  <ngx-start *ngIf=\"hideStart === false\" formControlName=\"start\"></ngx-start>\n  <br *ngIf=\"hideStart === false\">\n  <ngx-repeat formControlName=\"repeat\" [frequency]=\"frequency\"></ngx-repeat>\n  <br *ngIf=\"hideEnd === false\">\n  <ngx-end *ngIf=\"hideEnd === false\" formControlName=\"end\"></ngx-end>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: StartComponent, selector: "ngx-start", outputs: ["onChange"] }, { kind: "component", type: EndComponent, selector: "ngx-end", outputs: ["onChange"] }, { kind: "component", type: RepeatComponent, selector: "ngx-repeat", inputs: ["frequency"], outputs: ["onChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-rrule', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true }], template: "<form [formGroup]=\"form\">\n  <ngx-start *ngIf=\"hideStart === false\" formControlName=\"start\"></ngx-start>\n  <br *ngIf=\"hideStart === false\">\n  <ngx-repeat formControlName=\"repeat\" [frequency]=\"frequency\"></ngx-repeat>\n  <br *ngIf=\"hideEnd === false\">\n  <ngx-end *ngIf=\"hideEnd === false\" formControlName=\"end\"></ngx-end>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: NgxRruleService }], propDecorators: { hideStart: [{
                type: Input
            }], hideEnd: [{
                type: Input
            }], startAt: [{
                type: Input
            }], endAt: [{
                type: Input
            }], frequency: [{
                type: Input
            }], tz: [{
                type: Input
            }] } });

class NgxRruleModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleModule, declarations: [NgxRruleComponent, StartComponent, EndComponent, RepeatComponent, WeeklyComponent, MonthlyComponent, YearlyComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgbModule], exports: [NgxRruleComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleModule, providers: [
            { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
        ], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgbModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxRruleComponent, StartComponent, EndComponent, RepeatComponent, WeeklyComponent, MonthlyComponent, YearlyComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgbModule
                    ],
                    providers: [
                        { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
                    ],
                    exports: [NgxRruleComponent]
                }]
        }] });

/*
 * Public API Surface of ngx-rrule
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxRruleComponent, NgxRruleModule, NgxRruleService };
//# sourceMappingURL=ngx-rrule.mjs.map
