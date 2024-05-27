import { OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class MonthlyComponent implements OnInit, ControlValueAccessor {
    private formBuilder;
    onChange: EventEmitter<any>;
    form: FormGroup;
    private propagateChange;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    writeValue: (input: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onFormChange: () => void;
    radioChange: (event: any) => void;
    range: (start: number, end: number) => number[];
    static ɵfac: i0.ɵɵFactoryDeclaration<MonthlyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MonthlyComponent, "ngx-monthly", never, {}, { "onChange": "onChange"; }, never, never, false, never>;
}