import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRruleComponent } from './ngx-rrule.component';
import { StartComponent } from './components/start/start.component';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EndComponent } from './components/end/end.component';
import { RepeatComponent } from './components/repeat/repeat.component';
import { WeeklyComponent } from './components/repeat/weekly/weekly.component';
import { MonthlyComponent } from './components/repeat/monthly/monthly.component';
import { YearlyComponent } from './components/repeat/yearly/yearly.component';
import * as i0 from "@angular/core";
export class NgxRruleModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJydWxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1ycnVsZS9zcmMvbGliL25neC1ycnVsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7QUFlOUUsTUFBTSxPQUFPLGNBQWM7K0dBQWQsY0FBYztnSEFBZCxjQUFjLGlCQVpWLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLGFBRWpJLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLFNBQVMsYUFLRCxpQkFBaUI7Z0hBRWhCLGNBQWMsYUFMZDtZQUNULEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUU7U0FDNUQsWUFQQyxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixTQUFTOzs0RkFPQSxjQUFjO2tCQWIxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7b0JBQ3BJLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixTQUFTO3FCQUNWO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFO3FCQUM1RDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neFJydWxlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtcnJ1bGUuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXJ0L3N0YXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ2JEYXRlQWRhcHRlciwgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIsIE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRW5kQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2VuZC9lbmQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcGVhdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZXBlYXQvcmVwZWF0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWVrbHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVwZWF0L3dlZWtseS93ZWVrbHkuY29tcG9uZW50JztcbmltcG9ydCB7IE1vbnRobHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVwZWF0L21vbnRobHkvbW9udGhseS5jb21wb25lbnQnO1xuaW1wb3J0IHsgWWVhcmx5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlcGVhdC95ZWFybHkveWVhcmx5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05neFJydWxlQ29tcG9uZW50LCBTdGFydENvbXBvbmVudCwgRW5kQ29tcG9uZW50LCBSZXBlYXRDb21wb25lbnQsIFdlZWtseUNvbXBvbmVudCwgTW9udGhseUNvbXBvbmVudCwgWWVhcmx5Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5nYk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5nYkRhdGVBZGFwdGVyLCB1c2VDbGFzczogTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIgfSxcbiAgXSxcbiAgZXhwb3J0czogW05neFJydWxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hScnVsZU1vZHVsZSB7IH1cbiJdfQ==