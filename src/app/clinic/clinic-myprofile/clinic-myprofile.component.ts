import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';

@Component({
  selector: 'app-clinic-myprofile',
  templateUrl: './clinic-myprofile.component.html',
  styleUrls: ['./clinic-myprofile.component.sass']
})
export class ClinicMyprofileComponent implements OnInit {
  profilepassform: FormGroup;
  submitted = false;
  returnUrl: string;
  ohide = true;
  hide = true;
  chide = true;
  imageURL = `${environment.documentUrl}`;
  user_id: any;
  showAge: any;
  Users: any;
  BankDetails:any;
  document : any;
  beneficiary_name:string;
  bank_name:string;
  bank_account_number:number;
  ifsc_code:string;
  account_type:string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientdataService : PatientdataService,
    private authService: AuthService,
    private clinicService : ClinicServiceService
  ) { }

  ngOnInit() {
    this.profilepassform = this.formBuilder.group({
      opassword: ["", Validators.required],
      npassword: ["",  [Validators.required,
        Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
        )]],
      cpassword: ["", Validators.required],
    },
    {
      validator: ConfirmedValidator('npassword', 'cpassword')
    });
    // get return url from route parameters or default to '/'
    this.user_id = this.authService.currentUserValue.userid;
    const data = { 
      clinic_id: this.user_id
     };
    this.clinicService.profile(data).subscribe(
      (result) => {
        if(result.status_code==200){
          this.Users = result.profile_details;
          this.document = this.Users[0].document_name??'demouser.png';
        }
      },
      (err) => {
        console.log(err);
      }
    );
    const data1 = { 
      user_id: this.user_id ,
      role_id : 8
     };
    this.clinicService.viewBankDetail(data1).subscribe(
      (result) => {
        if(result.status_code==200){
          this.BankDetails = result.bank_details[0];
          this.beneficiary_name  = this.BankDetails.beneficiary_name??"-";
          this.bank_name  = this.BankDetails.bank_name??"-";
          this.bank_account_number  = this.BankDetails.bank_account_number??"-";
          this.ifsc_code  = this.BankDetails.ifsc_code??"-";
          this.account_type  = this.BankDetails.account_type??"-";
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get fun() {
    return this.profilepassform.controls;
  }
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profilepassform.invalid) {
     
    } else {
      if(data.npassword != data.cpassword){
        Swal.fire(
          // 'New Password And Confirm Password Does Not Match',
          '<p>New Password And Confirm Password Does Not Match</p>',
          // error,
          // 'error'
        )
      }
      const user_passDetail = {
        "id":this.authService.currentUserValue.userid,
        "old_password":data.opassword,
        "password":data.npassword
       };

       this.patientdataService.updatePassword(user_passDetail).subscribe(
        (result)=>{
          if(result.status_code == 200){
            Swal.fire(
              '',
              result.message,
              'success'
            )
            const currentUrl = this.router.url;
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([currentUrl]);
              // });
            this.router.navigate(['/clinic/dashboard']);
         
          }
          if (this.profilepassform.valid) {
            this.profilepassform.reset();
          }
        },
        (err)=>{
        
          Swal.fire(
            '',
            err,
            'error'
          )
         // this.success_message= false;
         // this.error_message = true;
         // this.error_message_text = err;  
        }
       );
  }
}
}