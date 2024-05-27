import { Component, Output, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@ng-bootstrap/ng-bootstrap";
export class StartComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXJydWxlL3NyYy9saWIvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi9jb21wb25lbnRzL3N0YXJ0L3N0YXJ0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7O0FBU3ZFLE1BQU0sT0FBTyxjQUFjO0lBTXpCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTGxDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBc0J4QyxlQUFVLEdBQUcsQ0FBQyxLQUFVLEVBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbkIsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3ZDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQVNELGlCQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ2xCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDO29CQUNuQixNQUFNLEVBQUU7d0JBQ04sSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztxQkFDMUM7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFBO1FBdENDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2pDLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBUUQsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztJQUN6QixDQUFDOytHQWxDVSxjQUFjO21HQUFkLGNBQWMsdUVBRmQsQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQywwQkNUdkcsb1dBS0E7OzRGRE1hLGNBQWM7a0JBTjFCLFNBQVM7K0JBQ0UsV0FBVyxhQUdWLENBQUMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dGQUczRixRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2Zvcm1hdERhdGV9IGZyb20gXCIuLi8uLi91dGlsL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc3RhcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RhcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdGFydC5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU3RhcnRDb21wb25lbnQpLCBtdWx0aTogdHJ1ZX1dXG59KVxuZXhwb3J0IGNsYXNzIFN0YXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIHN0YXJ0RGF0ZTogYW55O1xuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHN0YXJ0RGF0ZTogJydcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uRm9ybUNoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm9uRm9ybUNoYW5nZSgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICB3cml0ZVZhbHVlID0gKGlucHV0OiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICBzdGFydERhdGU6IG5ldyBEYXRlKGlucHV0Lm9uRGF0ZS5kYXRlKVxuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgfVxuXG4gIG9uRm9ybUNoYW5nZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wYWdhdGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcbiAgICAgICAgb25EYXRlOiB7XG4gICAgICAgICAgZGF0ZTogbmV3IERhdGUodGhpcy5mb3JtLnZhbHVlLnN0YXJ0RGF0ZSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCgpO1xuICB9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1cIiBjbGFzcz1cImZvcm0taW5saW5lXCI+XG4gIDxsYWJlbCBmb3I9XCJpbmxpbmVGb3JtSW5wdXROYW1lMlwiIGNsYXNzPVwibXItMVwiPlN0YXJ0PC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbWItMiBtci1zbS0yXCIgaWQ9XCJpbmxpbmVGb3JtSW5wdXROYW1lMlwiIGZvcm1Db250cm9sTmFtZT1cInN0YXJ0RGF0ZVwiIHBsYWNlaG9sZGVyPVwiU3RhcnQgRGF0ZVwiXG4gICAgICAgICBuYW1lPVwiZHBcIiBuZ2JEYXRlcGlja2VyICNkPVwibmdiRGF0ZXBpY2tlclwiIChjbGljayk9XCJkLnRvZ2dsZSgpXCI+XG48L2Zvcm0+XG4iXX0=