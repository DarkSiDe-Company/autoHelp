import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of, switchMap } from 'rxjs';

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
            userPhone: [null, [Validators.required, Validators.pattern(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}/)]],
            userName: [null],
            userCarBrand: [null],
        })

        this.requestForm.valueChanges.pipe(switchMap((value) => {
            const phoneControl = this.requestForm.get('userPhone');

            if (phoneControl) {
                return phoneControl?.valueChanges
            }
            return of(null)

        })).subscribe((controlValue: string) => {
            console.log(controlValue)
            if (controlValue) {
                const replace = String(controlValue).replace(/^\+7/, '').replace(/\D/g, '');
                console.log(replace);
                this.requestForm.get('userPhone')?.setValue(replace, { emitEvent: false })
            }

        }

        )
    }

    onSubmit(form: FormGroup): void {
        console.log(form.valid)
    }
}
