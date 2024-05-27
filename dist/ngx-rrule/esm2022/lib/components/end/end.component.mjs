import { Component, Output, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "@ng-bootstrap/ng-bootstrap";
export class EndComponent {
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.10", type: EndComponent, selector: "ngx-end", outputs: { onChange: "onChange" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EndComponent), multi: true }], ngImport: i0, template: "\n<form [formGroup]=\"form\" class=\"form-inline\">\n  <div class=\"row\">\n    <div class=\"form-group col-lg-12\">\n      <label class=\"mr-2\">Ends</label>\n      <select  formControlName=\"mode\" class=\"form-control\">\n        <option value=\"Never\">Never</option>\n        <option value=\"After\">After</option>\n        <option value=\"On date\">On date</option>\n      </select>\n      <div *ngIf=\"form.value.mode === 'After'\">\n        <div class=\"form-group m-0 row d-flex align-items-center\">\n          <input formControlName=\"after\"  aria-label=\"End after\"\n                 class=\"form-control ml-2\" />\n          <label class=\"ml-1\">occurrences</label>\n        </div>\n      </div>\n      <input  *ngIf=\"form.value.mode == 'On date'\" class=\"form-control ml-2\" formControlName=\"endAt\" placeholder=\"yyyy-mm-dd\"\n              ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\">\n    </div>\n  </div>\n</form>\n\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.10", ngImport: i0, type: EndComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-end', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EndComponent), multi: true }], template: "\n<form [formGroup]=\"form\" class=\"form-inline\">\n  <div class=\"row\">\n    <div class=\"form-group col-lg-12\">\n      <label class=\"mr-2\">Ends</label>\n      <select  formControlName=\"mode\" class=\"form-control\">\n        <option value=\"Never\">Never</option>\n        <option value=\"After\">After</option>\n        <option value=\"On date\">On date</option>\n      </select>\n      <div *ngIf=\"form.value.mode === 'After'\">\n        <div class=\"form-group m-0 row d-flex align-items-center\">\n          <input formControlName=\"after\"  aria-label=\"End after\"\n                 class=\"form-control ml-2\" />\n          <label class=\"ml-1\">occurrences</label>\n        </div>\n      </div>\n      <input  *ngIf=\"form.value.mode == 'On date'\" class=\"form-control ml-2\" formControlName=\"endAt\" placeholder=\"yyyy-mm-dd\"\n              ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\">\n    </div>\n  </div>\n</form>\n\n" }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1ycnVsZS9zcmMvbGliL2NvbXBvbmVudHMvZW5kL2VuZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcnJ1bGUvc3JjL2xpYi9jb21wb25lbnRzL2VuZC9lbmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBU3ZFLE1BQU0sT0FBTyxZQUFZO0lBS3ZCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSmxDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBMkJ4QyxlQUFVLEdBQUcsQ0FBQyxLQUFVLEVBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbkIsR0FBRyxLQUFLO2dCQUNSLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNuQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7UUFTRCxpQkFBWSxHQUFHLEdBQUcsRUFBRTtZQUNsQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDcEMsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsS0FBSztpQkFDWjthQUNGLENBQUM7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFBO1FBRUQsZ0JBQVcsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzNCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNuQixLQUFLLEVBQUUsRUFBRTtpQkFDVixDQUFDLENBQUM7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ25CLFVBQVUsRUFBRSxFQUFFO29CQUNkLFFBQVEsRUFBRSxFQUFFO2lCQUNiLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFBO1FBRU0sVUFBSyxHQUFHLENBQUMsS0FBYSxFQUFFLEdBQVcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBOUR0RyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBRTtRQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBRTtRQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDO1lBQ3pCLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBU0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztJQUN6QixDQUFDOytHQXhDVSxZQUFZO21HQUFaLFlBQVkscUVBRlosQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQywwQkNUckcsNjdCQXVCQTs7NEZEWmEsWUFBWTtrQkFOeEIsU0FBUzsrQkFDRSxTQUFTLGFBR1IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0ZBR3pGLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Z2V0RGF0ZVBhcnRzfSBmcm9tIFwiLi4vLi4vdXRpbC9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWVuZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9lbmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lbmQuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEVuZENvbXBvbmVudCksIG11bHRpOiB0cnVlfV1cbn0pXG5leHBvcnQgY2xhc3MgRW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2U6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKCkgO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZU9iai5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkYXkgPSBkYXRlT2JqLmdldERhdGUoKSA7XG4gICAgY29uc3QgeWVhciA9IGRhdGVPYmouZ2V0RnVsbFllYXIoKTtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGFmdGVyOiAxLFxuICAgICAgZW5kQXQ6IHttb250aCwgZGF5LCB5ZWFyfSxcbiAgICAgIG1vZGU6ICdOZXZlcidcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uRm9ybUNoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm9uRm9ybUNoYW5nZSgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICB3cml0ZVZhbHVlID0gKGlucHV0OiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAuLi5pbnB1dCxcbiAgICAgIGVuZEF0OiBuZXcgRGF0ZShpbnB1dC5vbkRhdGUuZGF0ZSlcbiAgICB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gIH1cblxuICBvbkZvcm1DaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5kQXQgPSB0aGlzLmZvcm0udmFsdWUuZW5kQXQ7XG4gICAgY29uc3QgcGFyYW0gPSB7XG4gICAgICAuLi50aGlzLmZvcm0udmFsdWUsXG4gICAgICBvbkRhdGU6IHtcbiAgICAgICAgZGF0ZTogZW5kQXRcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHBhcmFtKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoKTtcbiAgfVxuXG4gIHJhZGlvQ2hhbmdlID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnb24gdGhlJykge1xuICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICBvbkRheTogJycsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICBvblRoZVdoaWNoOiAnJyxcbiAgICAgICAgb25UaGVEYXk6ICcnXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5vbkZvcm1DaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyByYW5nZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikgPT4gQXJyYXkuZnJvbSh7bGVuZ3RoOiAoZW5kIC0gc3RhcnQpfSwgKHYsIGspID0+IGsgKyBzdGFydCk7XG59XG4iLCJcbjxmb3JtIFtmb3JtR3JvdXBdPVwiZm9ybVwiIGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1sZy0xMlwiPlxuICAgICAgPGxhYmVsIGNsYXNzPVwibXItMlwiPkVuZHM8L2xhYmVsPlxuICAgICAgPHNlbGVjdCAgZm9ybUNvbnRyb2xOYW1lPVwibW9kZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJOZXZlclwiPk5ldmVyPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJBZnRlclwiPkFmdGVyPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJPbiBkYXRlXCI+T24gZGF0ZTwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZm9ybS52YWx1ZS5tb2RlID09PSAnQWZ0ZXInXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG0tMCByb3cgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJhZnRlclwiICBhcmlhLWxhYmVsPVwiRW5kIGFmdGVyXCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbWwtMlwiIC8+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwibWwtMVwiPm9jY3VycmVuY2VzPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxpbnB1dCAgKm5nSWY9XCJmb3JtLnZhbHVlLm1vZGUgPT0gJ09uIGRhdGUnXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbWwtMlwiIGZvcm1Db250cm9sTmFtZT1cImVuZEF0XCIgcGxhY2Vob2xkZXI9XCJ5eXl5LW1tLWRkXCJcbiAgICAgICAgICAgICAgbmdiRGF0ZXBpY2tlciAjZD1cIm5nYkRhdGVwaWNrZXJcIiAoY2xpY2spPVwiZC50b2dnbGUoKVwiPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZm9ybT5cblxuIl19