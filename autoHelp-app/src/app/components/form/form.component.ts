import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.less']
})
export class FormComponent {

    requestForm: FormGroup = new FormGroup({
        userName: new FormControl(null),
        userPhone: new FormControl(null),
        userCarBrand: new FormControl(null),
    });

    sendRequest(): void {
        console.log(this.requestForm.value)
    }
}
