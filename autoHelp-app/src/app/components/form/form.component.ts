import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

    requestForm: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder, private supabase: SupabaseService) { }

    completeForm: boolean = false;

    ngOnInit(): void {
        this.requestForm = this.fb.group({
            userPhone: [null, [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{3}\d{3}\d{2}\d{2}/)]],
            userName: [null, [Validators.required]],
            userCarBrand: [null, [Validators.required]],
            userCommentary: [null],
        })


    }

    async addRequest(userPhone: string, user_name: string, user_car: string, user_commentary?: string): Promise<void> {
        let { error } = await this.supabase.insertRequest(userPhone, user_name, user_car, user_commentary);
        if (error) {
            console.error('error', error.message);
        } else {

        }
    }
    onSubmit(form: FormGroup) {
        this.addRequest(this.requestForm.value.userPhone, this.requestForm.value.userName, this.requestForm.value.userCarBrand, this.requestForm.value.userCommentary)
        this.requestForm.reset()
        this.completeForm = true;
    }
}
