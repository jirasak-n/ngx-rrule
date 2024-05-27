import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { computeRRule } from '../lib/util/computeRRule/fromString/computeRRule';
import { formatDate, getDateParts } from '../lib/util/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "./ngx-rrule.service";
import * as i3 from "@angular/common";
import * as i4 from "./components/start/start.component";
import * as i5 from "./components/end/end.component";
import * as i6 from "./components/repeat/repeat.component";
export class NgxRruleComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleComponent, deps: [{ token: i1.FormBuilder }, { token: i2.NgxRruleService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: NgxRruleComponent, selector: "ngx-rrule", inputs: { hideStart: "hideStart", hideEnd: "hideEnd", startAt: "startAt", endAt: "endAt", frequency: "frequency", tz: "tz" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"form\">\n  <ngx-start *ngIf=\"hideStart === false\" formControlName=\"start\"></ngx-start>\n  <br *ngIf=\"hideStart === false\">\n  <ngx-repeat formControlName=\"repeat\" [frequency]=\"frequency\"></ngx-repeat>\n  <br *ngIf=\"hideEnd === false\">\n  <ngx-end *ngIf=\"hideEnd === false\" formControlName=\"end\"></ngx-end>\n</form>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.StartComponent, selector: "ngx-start", outputs: ["onChange"] }, { kind: "component", type: i5.EndComponent, selector: "ngx-end", outputs: ["onChange"] }, { kind: "component", type: i6.RepeatComponent, selector: "ngx-repeat", inputs: ["frequency"], outputs: ["onChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: NgxRruleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-rrule', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true }], template: "<form [formGroup]=\"form\">\n  <ngx-start *ngIf=\"hideStart === false\" formControlName=\"start\"></ngx-start>\n  <br *ngIf=\"hideStart === false\">\n  <ngx-repeat formControlName=\"repeat\" [frequency]=\"frequency\"></ngx-repeat>\n  <br *ngIf=\"hideEnd === false\">\n  <ngx-end *ngIf=\"hideEnd === false\" formControlName=\"end\"></ngx-end>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.NgxRruleService }], propDecorators: { hideStart: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJydWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1ycnVsZS9zcmMvbGliL25neC1ycnVsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi9uZ3gtcnJ1bGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQWdELGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7O0FBUTVELE1BQU0sT0FBTyxpQkFBaUI7SUFTNUIsWUFBb0IsV0FBd0IsRUFDbEMsT0FBd0I7UUFEZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQVR6QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUE4Q3pCLGVBQVUsR0FBRyxDQUFDLEtBQVUsRUFBUSxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztZQUN2QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0UsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxF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LE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLCtDQ1Y1RyxrV0FPQTs7NEZES2EsaUJBQWlCO2tCQU43QixTQUFTOytCQUNFLFdBQVcsYUFHVixDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDOzhHQUdqRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ3hScnVsZVNlcnZpY2UgfSBmcm9tICcuL25neC1ycnVsZS5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbXB1dGVSUnVsZSB9IGZyb20gJy4uL2xpYi91dGlsL2NvbXB1dGVSUnVsZS9mcm9tU3RyaW5nL2NvbXB1dGVSUnVsZSc7XG5pbXBvcnQge2Zvcm1hdERhdGUsIGdldERhdGVQYXJ0c30gZnJvbSAnLi4vbGliL3V0aWwvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJydWxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1ycnVsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neFJydWxlQ29tcG9uZW50KSwgbXVsdGk6IHRydWUgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4UnJ1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBoaWRlU3RhcnQgPSBmYWxzZTtcbiAgQElucHV0KCkgaGlkZUVuZCA9IGZhbHNlO1xuICBASW5wdXQoKSBzdGFydEF0PzogRGF0ZTtcbiAgQElucHV0KCkgZW5kQXQ/OiBEYXRlO1xuICBASW5wdXQoKSBmcmVxdWVuY3k6IGFueTtcbiAgQElucHV0KCkgdHo6IGFueTtcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2U6IGFueTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBOZ3hScnVsZVNlcnZpY2UpIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xuICAgICAgc3RhcnQ6IHt9LFxuICAgICAgcmVwZWF0OiB7fSxcbiAgICAgIGVuZDoge1xuICAgICAgICBtb2RlOiAnTmV2ZXInXG4gICAgICB9XG4gICAgfTtcblxuXG4gICAgaWYgKHRoaXMuZW5kQXQpIHtcbiAgICAgIHBhcmFtcy5lbmQgPSB7XG4gICAgICAgIG1vZGU6ICdPbiBkYXRlJyxcbiAgICAgICAgb25EYXRlOiB7XG4gICAgICAgICAgZGF0ZTogZ2V0RGF0ZVBhcnRzKHRoaXMuZW5kQXQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGFydEF0KSB7XG4gICAgICBwYXJhbXMuc3RhcnQgPSB7XG4gICAgICAgIG9uRGF0ZToge1xuICAgICAgICAgIGRhdGU6IGdldERhdGVQYXJ0cyh0aGlzLnN0YXJ0QXQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHBhcmFtcyk7XG5cbiAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMub25Gb3JtQ2hhbmdlKCk7XG4gICAgfSwgMTAwKSk7XG4gIH1cblxuICB3cml0ZVZhbHVlID0gKGlucHV0OiBhbnkpOiB2b2lkID0+IHtcbiAgICBjb25zdCBjb25maWc6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZ3VyZUZyZXF1ZW5jeSA9ICgpID0+IChjb25maWcucmVwZWF0ID8gY29uZmlnLnJlcGVhdFswXSA6ICdZZWFybHknKTtcbiAgICBjb25zdCBjb25maWd1cmVZZWFybHkgPSAoKSA9PiAoY29uZmlnLnllYXJseSB8fCAnb24nKTtcbiAgICBjb25zdCBjb25maWd1cmVNb250aGx5ID0gKCkgPT4gKGNvbmZpZy5tb250aGx5IHx8ICdvbicpO1xuICAgIGNvbnN0IGNvbmZpZ3VyZUVuZCA9ICgpID0+IChjb25maWcuZW5kID8gY29uZmlnLmVuZFswXSA6ICdOZXZlcicpO1xuICAgIGNvbnN0IGNvbmZpZ3VyZUhpZGVTdGFydCA9ICgpID0+ICh0eXBlb2YgY29uZmlnLmhpZGVTdGFydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogY29uZmlnLmhpZGVTdGFydCk7XG4gICAgLy8gY29uc3QgdW5pcXVlUnJ1bGVJZCA9IGlzRW1wdHkoaWQpID8gdW5pcXVlSWQoJ3JydWxlLScpIDogaWQ7XG4gICAgY29uc3QgaW5pdF9kYXRhID0ge1xuICAgICAgc3RhcnQ6IHtcbiAgICAgICAgb25EYXRlOiB7XG4gICAgICAgICAgZGF0ZTogZm9ybWF0RGF0ZShuZXcgRGF0ZSgpKSxcbiAgICAgICAgICBvcHRpb25zOiB7fSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXBlYXQ6IHtcbiAgICAgICAgZnJlcXVlbmN5OiBjb25maWd1cmVGcmVxdWVuY3koKSxcbiAgICAgICAgeWVhcmx5OiB7XG4gICAgICAgICAgbW9kZTogY29uZmlndXJlWWVhcmx5KCksXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIG1vbnRoOiAnSmFuJyxcbiAgICAgICAgICAgIGRheTogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVGhlOiB7XG4gICAgICAgICAgICBtb250aDogJ0phbicsXG4gICAgICAgICAgICBkYXk6ICdNb25kYXknLFxuICAgICAgICAgICAgd2hpY2g6ICdGaXJzdCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBtb2RlczogY29uZmlnLnllYXJseSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtb250aGx5OiB7XG4gICAgICAgICAgbW9kZTogY29uZmlndXJlTW9udGhseSgpLFxuICAgICAgICAgIGludGVydmFsOiAxLFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBkYXk6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblRoZToge1xuICAgICAgICAgICAgZGF5OiAnTW9uZGF5JyxcbiAgICAgICAgICAgIHdoaWNoOiAnRmlyc3QnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgLy8gbW9kZXM6IGNvbmZpZy5tb250aGx5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHdlZWtseToge1xuICAgICAgICAgIGludGVydmFsOiAxLFxuICAgICAgICAgIGRheXM6IHtcbiAgICAgICAgICAgIG1vbjogZmFsc2UsXG4gICAgICAgICAgICB0dWU6IGZhbHNlLFxuICAgICAgICAgICAgd2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHRodTogZmFsc2UsXG4gICAgICAgICAgICBmcmk6IGZhbHNlLFxuICAgICAgICAgICAgc2F0OiBmYWxzZSxcbiAgICAgICAgICAgIHN1bjogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyB3ZWVrU3RhcnRzT25TdW5kYXk6IGNvbmZpZy53ZWVrU3RhcnRzT25TdW5kYXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZGFpbHk6IHtcbiAgICAgICAgICBpbnRlcnZhbDogMSxcbiAgICAgICAgfSxcbiAgICAgICAgaG91cmx5OiB7XG4gICAgICAgICAgaW50ZXJ2YWw6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAvLyBmcmVxdWVuY3k6IGNvbmZpZy5yZXBlYXQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZW5kOiB7XG4gICAgICAgIG1vZGU6IGNvbmZpZ3VyZUVuZCgpLFxuICAgICAgICBhZnRlcjogMSxcbiAgICAgICAgb25EYXRlOiB7XG4gICAgICAgICAgZGF0ZTogZm9ybWF0RGF0ZShuZXcgRGF0ZSgpKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyB3ZWVrU3RhcnRzT25TdW5kYXk6IGNvbmZpZy53ZWVrU3RhcnRzT25TdW5kYXksXG4gICAgICAgICAgICAvLyBjYWxlbmRhckNvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbW9kZXM6IGNvbmZpZy5lbmQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBoaWRlU3RhcnQ6IGNvbmZpZ3VyZUhpZGVTdGFydCgpLFxuICAgICAgICBoaWRlRW5kOiBjb25maWcuaGlkZUVuZCxcbiAgICAgICAgaGlkZUVycm9yOiBjb25maWcuaGlkZUVycm9yLFxuICAgICAgICB3ZWVrU3RhcnRzT25TdW5kYXk6IGNvbmZpZy53ZWVrU3RhcnRzT25TdW5kYXksXG4gICAgICB9LFxuICAgICAgZXJyb3I6IG51bGwsXG4gICAgfTtcblxuXG4gICAgY29uc3QgZGF0YSA9IGNvbXB1dGVSUnVsZShpbml0X2RhdGEsIGlucHV0KTtcbiAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZShkYXRhKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gIH1cblxuICBvbkZvcm1DaGFuZ2UgPSAoKSA9PiB7XG4gICAgbGV0IHJSdWxlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmZvcm0udmFsdWU7XG4gICAgICBpZiAodGhpcy5oaWRlU3RhcnQgJiYgIXRoaXMuc3RhcnRBdCkge1xuICAgICAgICBwYXJhbXMuc3RhcnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaGlkZUVuZCAmJiAhdGhpcy5lbmRBdCkge1xuICAgICAgICBwYXJhbXMuZW5kID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJSdWxlID0gdGhpcy5zZXJ2aWNlLmNvbXB1dGVSUnVsZSh7IC4uLnBhcmFtcywgb3B0aW9uczoge3R6OiB0aGlzLnR6fSB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG4gICAgICAgIHJhdzogdGhpcy5mb3JtLnZhbHVlLFxuICAgICAgICByUnVsZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UoKTtcbiAgICB9LCAxMClcbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gIDxuZ3gtc3RhcnQgKm5nSWY9XCJoaWRlU3RhcnQgPT09IGZhbHNlXCIgZm9ybUNvbnRyb2xOYW1lPVwic3RhcnRcIj48L25neC1zdGFydD5cbiAgPGJyICpuZ0lmPVwiaGlkZVN0YXJ0ID09PSBmYWxzZVwiPlxuICA8bmd4LXJlcGVhdCBmb3JtQ29udHJvbE5hbWU9XCJyZXBlYXRcIiBbZnJlcXVlbmN5XT1cImZyZXF1ZW5jeVwiPjwvbmd4LXJlcGVhdD5cbiAgPGJyICpuZ0lmPVwiaGlkZUVuZCA9PT0gZmFsc2VcIj5cbiAgPG5neC1lbmQgKm5nSWY9XCJoaWRlRW5kID09PSBmYWxzZVwiIGZvcm1Db250cm9sTmFtZT1cImVuZFwiPjwvbmd4LWVuZD5cbjwvZm9ybT5cbiJdfQ==