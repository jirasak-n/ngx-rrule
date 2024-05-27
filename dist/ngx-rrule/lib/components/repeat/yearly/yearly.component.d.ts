import { OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class YearlyComponent implements OnInit, ControlValueAccessor {
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
    range: (start: number, end: number) => number[];
    static ɵfac: i0.ɵɵFactoryDeclaration<YearlyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YearlyComponent, "ngx-yearly", never, {}, { "onChange": "onChange"; }, never, never, false, never>;
}
