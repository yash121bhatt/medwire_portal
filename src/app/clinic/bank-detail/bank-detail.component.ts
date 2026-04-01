import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.sass']
})
export class BankDetailComponent implements OnInit{
  bankdetailForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  user_id: any;
  beneficiary_name:string;
  bank_name:string;
  bank_account_number:number;
  ifsc_code:string;
  bank_account_type:string;

  constructor(private fb: FormBuilder ,private router : Router, private authService : AuthService , private clinicService : ClinicServiceService) {
    this.bankdetailForm = this.fb.group ({
      beneficiary_name: ["", Validators.required,],
      bank_name: ["", Validators.required,],
      bank_account_number: ["", Validators.required,],
      ifsc_code: ["", Validators.required,],
      bank_account_type: ["", Validators.required,],
    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  ngOnInit(){
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/clinic/clinic-editmyprofile"]);
  
    }
    else{
  
    }
    this.user_id = this.authService.currentUserValue.userid;
    const data = { 
      user_id: this.user_id ,
      role_id : 8
     };
    this.clinicService.viewBankDetail(data).subscribe(
      (result) => {
        if(result.status_code==200){
          let Bankdetail = result.bank_details[0];
           this.beneficiary_name = Bankdetail.beneficiary_name;
           this.bank_account_number = Bankdetail.bank_account_number;
           this.bank_account_type = Bankdetail.account_type;
           this.bank_name = Bankdetail.bank_name;
           this.ifsc_code = Bankdetail.ifsc_code;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    let clinic_id =   this.authService.currentUserValue.userid;
    const data1 = {
       "user_id": clinic_id,
       "role_id" : 8,
       "beneficiary_name": this.bankdetailForm.value.beneficiary_name,
       "bank_name": this.bankdetailForm.value.bank_name,
       "bank_account_number" : this.bankdetailForm.value.bank_account_number,
       "ifsc_code" : this.bankdetailForm.value.ifsc_code,
       "account_type" : this.bankdetailForm.value.bank_account_type,
   }
   this.clinicService.addBankDetail(data1).subscribe (
    (result) => {
      if(result.status_code == 200){
        setTimeout(()=> {
          this.router.navigate(['/clinic/clinic-myprofile']);
        }, 600 );
      }
      Swal.fire(
        '',
        result.message,
        'success'
      )

    },
    (err) => {
      console.log(err);
      Swal.fire(
        '',
        err,
        'error'
      )
    } );
   this.submitted = true;
  }
}

