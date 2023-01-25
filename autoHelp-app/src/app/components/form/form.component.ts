import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient } from "@supabase/supabase-js";
import { SupabaseService } from '../../supabase.service';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

    requestForm: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder, private supabase: SupabaseService) { }

    ngOnInit(): void {
        this.requestForm = this.fb.group({
            userPhone: [null, [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{3}\d{3}\d{2}\d{2}/)]],
            userName: [null, [Validators.required]],
            userCarBrand: [null],
        })


        this.fetchRequests();
    }

    async fetchRequests(): Promise<void> {
        let { data, error } = await this.supabase.getAll();
        if (error) {
            console.error('error', error.message);
        } else {
            console.log(data)
        }
    }

    async addRequest(userPhone: string, user_name: string, user_car?: string): Promise<void> {
        let { data: todo, error } = await this.supabase.insertRequest(userPhone, user_name, user_car);
        if (error) {
            console.error('error', error.message);
        } else {

        }
    }
    onSubmit(form: FormGroup) {
        this.addRequest(this.requestForm.value.userPhone, this.requestForm.value.userName, this.requestForm.value.userCarBrand)
        this.requestForm.reset()
    }
}
