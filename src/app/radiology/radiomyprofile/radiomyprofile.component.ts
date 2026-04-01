import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { PatientdataService } from "src/app/services/patientdata.service";
import Swal from 'sweetalert2';
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-radiomyprofile',
  templateUrl: './radiomyprofile.component.html',
  styleUrls: ['./radiomyprofile.component.sass']
})
export class RadiomyprofileComponent implements OnInit {
  profilepassform: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  ohide = true;
  Users: any;
  user_id: number;
  token: string;
  showAge: any;
  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;
  imageURL = `${environment.documentUrl}`;
  bankInfo: any;
  beneficiary_name: any;
  bank_name: any;
  bank_account_number: any;
  ifsc_code: any;
  account_type: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private patientdataService: PatientdataService
  ) {

  }

  ngOnInit() {
    this.profilepassform = this.formBuilder.group({
      opassword: ["", Validators.required],
      npassword: ["", [Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
      )]],
      cpassword: ["", Validators.required],
    }, {
      validator: ConfirmedValidator('npassword', 'cpassword')
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    //API Call
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    this.patientdataService.profile(data).subscribe(
      (result) => {
        // console.log('profile', result);

        const convertAge = new Date(result.data.date_of_birth);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        this.Users = Array(result.data);
      },
      (err) => {
        console.log(err);
      }
    );

    //Bank API Call
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const bankData = {
      user_id: this.user_id,
      role_id: 4,
    };
    this.patientdataService.bankApi(bankData).subscribe(
      (result) => {
        // console.log('Bank Data = ', result.bank_details);
        this.bankInfo = result.bank_details ?? '-';
        this.beneficiary_name = result.bank_details[0].beneficiary_name ?? '-';
        this.bank_name = result.bank_details[0].bank_name ?? '-';
        this.bank_account_number = result.bank_details[0].bank_account_number ?? '-';
        this.ifsc_code = result.bank_details[0].ifsc_code ?? '-';
        this.account_type = result.bank_details[0].account_type ?? '-';

      },
      (err) => {
        console.log(err);
      }
    );
  }
  get fun() {
    return this.profilepassform.controls;
  }
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profilepassform.invalid) {
     
    } else {
      if(data.npassword!=data.cpassword){
        Swal.fire(
          // 'New Password And Confirm Password Does Not Match',
          '<p>New Password And Confirm Password Does Not Match</p>',
          // error,
          // 'error'
        )
      }
      else{
        const user_passDetail = {
          "id": this.authService.currentUserValue.userid,
          "old_password": data.opassword,
          "password": data.npassword
        };
  
        this.patientdataService.updatePassword(user_passDetail).subscribe(
          (result) => {
            if (result.status_code == 200) {
              Swal.fire(
                '',
                result.message,
                'success'
              )
              this.router.navigate(['/radiology/dashboard']);
              // const currentUrl = this.router.url;
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([currentUrl]);
              // });
            
            }
            if (this.profilepassform.valid) {
              this.profilepassform.reset();
            }
          },
          (err) => {
            Swal.fire(
              '',
              err,
              'error'
            )
  
          }
        );
      }
    

    }
  }
}
