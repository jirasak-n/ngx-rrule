import { OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class StartComponent implements OnInit, ControlValueAccessor {
    private formBuilder;
    onChange: EventEmitter<any>;
    form: FormGroup;
    startDate: any;
    private propagateChange;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    writeValue: (input: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onFormChange: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StartComponent, "ngx-start", never, {}, { "onChange": "onChange"; }, never, never, false, never>;
}
