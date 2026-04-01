import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.sass']
})
export class BankDetailComponent  {
  bankdetailForm: FormGroup;
  submitted = false;
  returnUrl: string;
  
  constructor(private fb: FormBuilder) {
    this.bankdetailForm = this.fb.group ({
      beneficiary_name: ["", Validators.required,],
      bank_name: ["", Validators.required,],
      bank_account_no: ["", Validators.required,],
      ifsc_code: ["", Validators.required,],
      bank_account_type: ["", Validators.required,],

    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
  }
}

