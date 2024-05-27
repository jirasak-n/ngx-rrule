import { Component, Output, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class WeeklyComponent {
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: WeeklyComponent, selector: "ngx-weekly", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeeklyComponent), multi: true }], ngImport: i0, template: "<form [formGroup]=\"weeklyForm\">\n  <div class=\"btn-group btn-group-toggle\">\n    <label class=\"btn-outline-primary btn-circle mr-2\" ngbButtonLabel  *ngFor=\"let day of days\">\n      <input type=\"checkbox\" [formControlName]=\"day.toLowerCase()\" ngbButton> {{day}}\n    </label>\n  </div>\n</form>\n", styles: [".btn-circle{width:30px;height:30px;padding:6px 0;border-radius:15px!important;text-align:center;font-size:12px;line-height:1.42857}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: WeeklyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-weekly', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeeklyComponent), multi: true }], template: "<form [formGroup]=\"weeklyForm\">\n  <div class=\"btn-group btn-group-toggle\">\n    <label class=\"btn-outline-primary btn-circle mr-2\" ngbButtonLabel  *ngFor=\"let day of days\">\n      <input type=\"checkbox\" [formControlName]=\"day.toLowerCase()\" ngbButton> {{day}}\n    </label>\n  </div>\n</form>\n", styles: [".btn-circle{width:30px;height:30px;padding:6px 0;border-radius:15px!important;text-align:center;font-size:12px;line-height:1.42857}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla2x5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1ycnVsZS9zcmMvbGliL2NvbXBvbmVudHMvcmVwZWF0L3dlZWtseS93ZWVrbHkuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXJydWxlL3NyYy9saWIvY29tcG9uZW50cy9yZXBlYXQvd2Vla2x5L3dlZWtseS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLE1BQU0sRUFBUyxVQUFVLEVBQUUsWUFBWSxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUVuSCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFRNUIsTUFBTSxPQUFPLGVBQWU7SUFLMUIsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFKbEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHakMsU0FBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUEyQmhFLGVBQVUsR0FBRyxDQUFDLEtBQVUsRUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFTRCxpQkFBWSxHQUFHLEdBQUcsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDekIsTUFBTyxLQUFLLEdBQUc7b0JBQ2IsUUFBUSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLEVBQUU7aUJBQ1QsQ0FBQztnQkFFRixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztnQkFDdEQsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBUSxDQUFDO2dCQUN0RSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFoREMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDdkMsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsS0FBSztZQUNWLEdBQUcsRUFBRSxLQUFLO1lBQ1YsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsS0FBSztZQUNWLEdBQUcsRUFBRSxLQUFLO1lBQ1YsR0FBRyxFQUFFLEtBQUs7WUFDVixjQUFjLEVBQUUsQ0FBQztTQUNsQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQU9ELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87SUFDekIsQ0FBQzsrR0F4Q1UsZUFBZTttR0FBZixlQUFlLHdFQUZmLENBQUMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsMEJDVHhHLHFUQU9BOzs0RkRJYSxlQUFlO2tCQU4zQixTQUFTOytCQUNFLFlBQVksYUFHWCxDQUFDLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dGQUc1RixRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBJbnB1dCwgZm9yd2FyZFJlZiwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC13ZWVrbHknLFxuICB0ZW1wbGF0ZVVybDogJy4vd2Vla2x5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2Vla2x5LmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBXZWVrbHlDb21wb25lbnQpLCBtdWx0aTogdHJ1ZX1dXG59KVxuZXhwb3J0IGNsYXNzIFdlZWtseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyB3ZWVrbHlGb3JtOiBGb3JtR3JvdXA7XG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlOiBhbnk7XG4gIHB1YmxpYyBkYXlzID0gWydNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCcsICdTdW4nXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLndlZWtseUZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2Vla2x5Rm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgbW9uOiBmYWxzZSxcbiAgICAgIHR1ZTogZmFsc2UsXG4gICAgICB3ZWQ6IGZhbHNlLFxuICAgICAgdGh1OiBmYWxzZSxcbiAgICAgIGZyaTogZmFsc2UsXG4gICAgICBzYXQ6IGZhbHNlLFxuICAgICAgc3VuOiBmYWxzZSxcbiAgICAgIHdlZWtseUludGVydmFsOiAwLFxuICAgIH0pO1xuXG4gICAgdGhpcy53ZWVrbHlGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UoKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cblxuICB3cml0ZVZhbHVlID0gKGlucHV0OiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLndlZWtseUZvcm0ucGF0Y2hWYWx1ZSh7Li4uaW5wdXQuZGF5cywgd2Vla2x5SW50ZXJ2YWw6IGlucHV0LmludGVydmFsfSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICB9XG5cbiAgb25Gb3JtQ2hhbmdlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BhZ2F0ZUNoYW5nZSkge1xuICAgICAgY29uc3QgIHZhbHVlID0ge1xuICAgICAgICBpbnRlcnZhbDogMCxcbiAgICAgICAgZGF5czogW11cbiAgICAgIH07XG5cbiAgICAgIHZhbHVlLmludGVydmFsID0gdGhpcy53ZWVrbHlGb3JtLnZhbHVlLndlZWtseUludGVydmFsO1xuICAgICAgdmFsdWUuZGF5cyA9IF8ub21pdCh0aGlzLndlZWtseUZvcm0udmFsdWUsIFsnd2Vla2x5SW50ZXJ2YWwnXSkgYXMgYW55O1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodmFsdWUpO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KCk7XG4gICAgfVxuICB9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cIndlZWtseUZvcm1cIj5cbiAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBidG4tZ3JvdXAtdG9nZ2xlXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiYnRuLW91dGxpbmUtcHJpbWFyeSBidG4tY2lyY2xlIG1yLTJcIiBuZ2JCdXR0b25MYWJlbCAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2Zvcm1Db250cm9sTmFtZV09XCJkYXkudG9Mb3dlckNhc2UoKVwiIG5nYkJ1dHRvbj4ge3tkYXl9fVxuICAgIDwvbGFiZWw+XG4gIDwvZGl2PlxuPC9mb3JtPlxuIl19