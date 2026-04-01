import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bank-detail',
  templateUrl: './edit-bank-detail.component.html',
  styleUrls: ['./edit-bank-detail.component.sass']
})
export class EditBankDetailComponent implements OnInit {

  bankdetailForm: FormGroup;
  submitted = false;
  returnUrl: string;
  user_id: any;
  token: string;
  beneficiary_name: any;
  bank_name: any;
  account_type: any;
  bank_account_number: any;
  ifsc_code: any;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private patientdataService :PatientdataService,
    private authService : AuthService
    ) {
    this.bankdetailForm = this.fb.group ({
      beneficiary_name: ["", Validators.required,],
      bank_name: ["", Validators.required,],
      bank_account_number: ["", Validators.required,],
      ifsc_code: ["", Validators.required,],
      account_type: ["", Validators.required,],

    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  

  ngOnInit(): void {
    const data = {
      "user_id": this.authService.currentUserValue.userid,
      "role_id": 4
  }
    this.patientdataService.bankApi(data).subscribe(
      (result)=>{
        this.beneficiary_name  = result.bank_details[0].beneficiary_name;
        this.bank_name         = result.bank_details[0].bank_name;
        this.account_type      = result.bank_details[0].account_type;
        this.bank_account_number = result.bank_details[0].bank_account_number;
        this.ifsc_code           = result.bank_details[0].ifsc_code;
         },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
      }
     );
  }


  onSubmit() {
    this.submitted = true;
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const bankDetail = {
      "user_id": this.user_id ,
      "role_id" : 4,
      "beneficiary_name" : this.bankdetailForm.value.beneficiary_name,
      "bank_name" : this.bankdetailForm.value.bank_name,
      "bank_account_number" : this.bankdetailForm.value.bank_account_number,
      "ifsc_code" : this.bankdetailForm.value.ifsc_code,
      "account_type" : this.bankdetailForm.value.account_type,
     };

     this.patientdataService.updateBankDetail(bankDetail).subscribe(
      (result)=>{
        if(result.status_code == 200){
        setTimeout(() => {
         this.router.navigate(["/radiology/radiomyprofile"]);
        }, 2000);
        Swal.fire(
          '',
          result.message,
          'success'
        )
        }
        else{
          Swal.fire(
            '',
            result.message,
            'error'
          )
        }
         },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
      }
     );
  }

}
