import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { NgxRruleService } from './ngx-rrule.service';
import * as i0 from "@angular/core";
export declare class NgxRruleComponent implements OnInit, OnChanges, ControlValueAccessor {
    private formBuilder;
    private service;
    hideStart: boolean;
    hideEnd: boolean;
    startAt?: Date;
    endAt?: Date;
    frequency: any;
    tz: any;
    form: FormGroup;
    private propagateChange;
    constructor(formBuilder: FormBuilder, service: NgxRruleService);
    ngOnInit(): void;
    writeValue: (input: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onFormChange: () => void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxRruleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxRruleComponent, "ngx-rrule", never, { "hideStart": { "alias": "hideStart"; "required": false; }; "hideEnd": { "alias": "hideEnd"; "required": false; }; "startAt": { "alias": "startAt"; "required": false; }; "endAt": { "alias": "endAt"; "required": false; }; "frequency": { "alias": "frequency"; "required": false; }; "tz": { "alias": "tz"; "required": false; }; }, {}, never, never, false, never>;
}
