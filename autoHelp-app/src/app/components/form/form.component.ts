import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

    requestForm: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.requestForm = this.fb.group({
            userPhone: [null, [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{3}\d{3}\d{2}\d{2}/)]],
            userName: [null, [Validators.required]],
            userCarBrand: [null],
        })
    }

    onSubmit(form: FormGroup): void {
        console.log(this.requestForm.value)
    }
}
