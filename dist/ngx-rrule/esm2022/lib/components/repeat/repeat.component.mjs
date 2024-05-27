import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "./weekly/weekly.component";
import * as i4 from "./monthly/monthly.component";
import * as i5 from "./yearly/yearly.component";
export class RepeatComponent {
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: RepeatComponent, selector: "ngx-repeat", inputs: { frequency: "frequency" }, outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RepeatComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"form\">\n  <div class=\"row col-lg-12 form-inline\">\n    <label class=\"mr-2\">Repeat every</label>\n    <input aria-label=\"Repeat interval\" class=\"form-control w-25\" value=\"1\" formControlName=\"interval\">\n\n    <select formControlName=\"frequency\" (change)=\"onOptionChange()\" class=\"form-control mt-md-0 mt-sm-2\">\n      <option value=\"Yearly\" *ngIf=\"!frequency || frequency.indexOf('Yearly') !== -1\">Year</option>\n      <option value=\"Monthly\" *ngIf=\"!frequency || frequency.indexOf('Monthly') !== -1\">Month</option>\n      <option value=\"Weekly\" *ngIf=\"!frequency || frequency.indexOf('Weekly') !== -1\">Week</option>\n      <option value=\"Daily\" *ngIf=\"!frequency || frequency.indexOf('Daily') !== -1\">Day</option>\n      <option value=\"Hourly\" *ngIf=\"!frequency || frequency.indexOf('Hourly') !== -1\">Hour</option>\n    </select>\n\n  </div>\n  <div class=\"row col mt-1 mb-1\">\n    <ngx-yearly *ngIf=\"form.value.frequency === 'Yearly'\" formControlName=\"yearly\"></ngx-yearly>\n    <ngx-monthly *ngIf=\"form.value.frequency === 'Monthly'\" formControlName=\"monthly\"></ngx-monthly>\n    <ngx-weekly *ngIf=\"form.value.frequency === 'Weekly'\" formControlName=\"weekly\"></ngx-weekly>\n  </div>\n</form>\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.WeeklyComponent, selector: "ngx-weekly", outputs: ["onChange"] }, { kind: "component", type: i4.MonthlyComponent, selector: "ngx-monthly", outputs: ["onChange"] }, { kind: "component", type: i5.YearlyComponent, selector: "ngx-yearly", outputs: ["onChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: RepeatComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-repeat', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RepeatComponent), multi: true }], template: "<form [formGroup]=\"form\">\n  <div class=\"row col-lg-12 form-inline\">\n    <label class=\"mr-2\">Repeat every</label>\n    <input aria-label=\"Repeat interval\" class=\"form-control w-25\" value=\"1\" formControlName=\"interval\">\n\n    <select formControlName=\"frequency\" (change)=\"onOptionChange()\" class=\"form-control mt-md-0 mt-sm-2\">\n      <option value=\"Yearly\" *ngIf=\"!frequency || frequency.indexOf('Yearly') !== -1\">Year</option>\n      <option value=\"Monthly\" *ngIf=\"!frequency || frequency.indexOf('Monthly') !== -1\">Month</option>\n      <option value=\"Weekly\" *ngIf=\"!frequency || frequency.indexOf('Weekly') !== -1\">Week</option>\n      <option value=\"Daily\" *ngIf=\"!frequency || frequency.indexOf('Daily') !== -1\">Day</option>\n      <option value=\"Hourly\" *ngIf=\"!frequency || frequency.indexOf('Hourly') !== -1\">Hour</option>\n    </select>\n\n  </div>\n  <div class=\"row col mt-1 mb-1\">\n    <ngx-yearly *ngIf=\"form.value.frequency === 'Yearly'\" formControlName=\"yearly\"></ngx-yearly>\n    <ngx-monthly *ngIf=\"form.value.frequency === 'Monthly'\" formControlName=\"monthly\"></ngx-monthly>\n    <ngx-weekly *ngIf=\"form.value.frequency === 'Weekly'\" formControlName=\"weekly\"></ngx-weekly>\n  </div>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }], frequency: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1ycnVsZS9zcmMvbGliL2NvbXBvbmVudHMvcmVwZWF0L3JlcGVhdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi9jb21wb25lbnRzL3JlcGVhdC9yZXBlYXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUF3QixpQkFBaUIsRUFBMEIsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQVFqRyxNQUFNLE9BQU8sZUFBZTtJQUsxQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUpsQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQixjQUFTLEdBQVcsUUFBUSxDQUFDO1FBd0V0QyxlQUFVLEdBQUcsQ0FBQyxLQUFVLEVBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFBO1FBU0QsaUJBQVksR0FBRyxHQUFHLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7YUFDbkIsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3BGLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQTtRQXpGQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7WUFDVixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLENBQUM7WUFDWCxTQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFO29CQUNGLEtBQUssRUFBRSxLQUFLO29CQUNaLEdBQUcsRUFBRSxHQUFHO2lCQUNUO2dCQUNELEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTztvQkFDZCxHQUFHLEVBQUUsUUFBUTtvQkFDYixLQUFLLEVBQUUsS0FBSztpQkFDYjthQUNGO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRTtvQkFDRixHQUFHLEVBQUUsQ0FBQztpQkFDUDtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLFFBQVE7aUJBQ2Q7YUFDRjtZQUNELE1BQU0sRUFBRTtnQkFDTixRQUFRLEVBQUUsQ0FBQztnQkFDWCxJQUFJLEVBQUU7b0JBQ0osR0FBRyxFQUFFLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLEtBQUs7aUJBQ1g7YUFDRjtZQUNELE1BQU0sRUFBRTtnQkFDTixRQUFRLEVBQUUsQ0FBQzthQUNaO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxDQUFDO2FBQ1o7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQU1ELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87SUFDekIsQ0FBQzsrR0FwRlUsZUFBZTttR0FBZixlQUFlLDRHQUZmLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsMEJDUDFHLHN2Q0FvQkE7OzRGRFhhLGVBQWU7a0JBTjNCLFNBQVM7K0JBQ0UsWUFBWSxhQUdYLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0ZBRzlGLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUUsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJlcGVhdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXBlYXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZXBlYXQuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSZXBlYXRDb21wb25lbnQpLCBtdWx0aTogdHJ1ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBSZXBlYXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBmcmVxdWVuY3k6IHN0cmluZyA9ICdXZWVrbHknO1xuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICB5ZWFybHk6IHt9LFxuICAgICAgbW9udGhseToge30sXG4gICAgICB3ZWVrbHk6IHt9LFxuICAgICAgaG91cmx5OiB7fSxcbiAgICAgIGRhaWx5OiB7fSxcbiAgICAgIGludGVydmFsOiAxLFxuICAgICAgZnJlcXVlbmN5OiAnV2Vla2x5J1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UoKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgb25PcHRpb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgeWVhcmx5OiB7XG4gICAgICAgIG1vZGU6ICdvbicsXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgbW9udGg6ICdKYW4nLFxuICAgICAgICAgIGRheTogJzEnXG4gICAgICAgIH0sXG4gICAgICAgIG9uVGhlOiB7XG4gICAgICAgICAgd2hpY2g6ICdGaXJzdCcsXG4gICAgICAgICAgZGF5OiAnTW9uZGF5JyxcbiAgICAgICAgICBtb250aDogJ0phbidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1vbnRobHk6IHtcbiAgICAgICAgbW9kZTogJ29uJyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBkYXk6IDFcbiAgICAgICAgfSxcbiAgICAgICAgb25UaGU6IHtcbiAgICAgICAgICB3aGljaDogJ0ZpcnN0JyxcbiAgICAgICAgICBkYXk6ICdNb25kYXknXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB3ZWVrbHk6IHtcbiAgICAgICAgaW50ZXJ2YWw6IDEsXG4gICAgICAgIGRheXM6IHtcbiAgICAgICAgICBtb246IGZhbHNlLFxuICAgICAgICAgIHR1ZTogZmFsc2UsXG4gICAgICAgICAgd2VkOiBmYWxzZSxcbiAgICAgICAgICB0aHU6IGZhbHNlLFxuICAgICAgICAgIGZyaTogZmFsc2UsXG4gICAgICAgICAgc2F0OiBmYWxzZSxcbiAgICAgICAgICBzdW46IGZhbHNlLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaG91cmx5OiB7XG4gICAgICAgIGludGVydmFsOiAxXG4gICAgICB9LFxuICAgICAgZGFpbHk6IHtcbiAgICAgICAgaW50ZXJ2YWw6IDFcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uRm9ybUNoYW5nZSgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSA9IChpbnB1dDogYW55KTogdm9pZCA9PiB7XG4gICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoeyAuLi5pbnB1dCwgaW50ZXJ2YWw6IGlucHV0W2lucHV0LmZyZXF1ZW5jeS50b0xvd2VyQ2FzZSgpXS5pbnRlcnZhbCB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gIH1cblxuICBvbkZvcm1DaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgLi4udGhpcy5mb3JtLnZhbHVlXG4gICAgfTtcbiAgICBwYXJhbXNbdGhpcy5mb3JtLnZhbHVlLmZyZXF1ZW5jeS50b0xvd2VyQ2FzZSgpXS5pbnRlcnZhbCA9IHRoaXMuZm9ybS52YWx1ZS5pbnRlcnZhbDtcbiAgICBpZiAodGhpcy5wcm9wYWdhdGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHBhcmFtcyk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCgpO1xuICB9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgPGRpdiBjbGFzcz1cInJvdyBjb2wtbGctMTIgZm9ybS1pbmxpbmVcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJtci0yXCI+UmVwZWF0IGV2ZXJ5PC9sYWJlbD5cbiAgICA8aW5wdXQgYXJpYS1sYWJlbD1cIlJlcGVhdCBpbnRlcnZhbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHctMjVcIiB2YWx1ZT1cIjFcIiBmb3JtQ29udHJvbE5hbWU9XCJpbnRlcnZhbFwiPlxuXG4gICAgPHNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJmcmVxdWVuY3lcIiAoY2hhbmdlKT1cIm9uT3B0aW9uQ2hhbmdlKClcIiBjbGFzcz1cImZvcm0tY29udHJvbCBtdC1tZC0wIG10LXNtLTJcIj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCJZZWFybHlcIiAqbmdJZj1cIiFmcmVxdWVuY3kgfHwgZnJlcXVlbmN5LmluZGV4T2YoJ1llYXJseScpICE9PSAtMVwiPlllYXI8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCJNb250aGx5XCIgKm5nSWY9XCIhZnJlcXVlbmN5IHx8IGZyZXF1ZW5jeS5pbmRleE9mKCdNb250aGx5JykgIT09IC0xXCI+TW9udGg8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCJXZWVrbHlcIiAqbmdJZj1cIiFmcmVxdWVuY3kgfHwgZnJlcXVlbmN5LmluZGV4T2YoJ1dlZWtseScpICE9PSAtMVwiPldlZWs8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCJEYWlseVwiICpuZ0lmPVwiIWZyZXF1ZW5jeSB8fCBmcmVxdWVuY3kuaW5kZXhPZignRGFpbHknKSAhPT0gLTFcIj5EYXk8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCJIb3VybHlcIiAqbmdJZj1cIiFmcmVxdWVuY3kgfHwgZnJlcXVlbmN5LmluZGV4T2YoJ0hvdXJseScpICE9PSAtMVwiPkhvdXI8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cblxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInJvdyBjb2wgbXQtMSBtYi0xXCI+XG4gICAgPG5neC15ZWFybHkgKm5nSWY9XCJmb3JtLnZhbHVlLmZyZXF1ZW5jeSA9PT0gJ1llYXJseSdcIiBmb3JtQ29udHJvbE5hbWU9XCJ5ZWFybHlcIj48L25neC15ZWFybHk+XG4gICAgPG5neC1tb250aGx5ICpuZ0lmPVwiZm9ybS52YWx1ZS5mcmVxdWVuY3kgPT09ICdNb250aGx5J1wiIGZvcm1Db250cm9sTmFtZT1cIm1vbnRobHlcIj48L25neC1tb250aGx5PlxuICAgIDxuZ3gtd2Vla2x5ICpuZ0lmPVwiZm9ybS52YWx1ZS5mcmVxdWVuY3kgPT09ICdXZWVrbHknXCIgZm9ybUNvbnRyb2xOYW1lPVwid2Vla2x5XCI+PC9uZ3gtd2Vla2x5PlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==