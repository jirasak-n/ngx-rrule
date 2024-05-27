import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxRruleModule } from 'ngx-rrule';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxRruleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng17-rrule';
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      testRule: ''
    });
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(() => {
      const rRuleFormValue = this.myForm.value.testRule;
      console.log(rRuleFormValue.rRule);
      console.log(rRuleFormValue.raw);
    });
  }
}
