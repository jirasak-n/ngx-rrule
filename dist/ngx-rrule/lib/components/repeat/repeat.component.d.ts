import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class RepeatComponent implements OnInit, ControlValueAccessor {
    private formBuilder;
    onChange: EventEmitter<any>;
    form: FormGroup;
    frequency: string;
    private propagateChange;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    onOptionChange(): void;
    writeValue: (input: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onFormChange: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RepeatComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RepeatComponent, "ngx-repeat", never, { "frequency": { "alias": "frequency"; "required": false; }; }, { "onChange": "onChange"; }, never, never, false, never>;
}
