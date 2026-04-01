import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-labmyprofile',
  templateUrl: './labmyprofile.component.html',
  styleUrls: ['./labmyprofile.component.sass'],
  providers: [DatePipe]
})
export class LabmyprofileComponent implements OnInit {
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
  role_id: any;
  bankInfo: any;
  roleid: any;
  bankData: any;
  beneficiary_name: any;
  bank_name: any;
  bank_account_number: any;
  ifsc_code: any;
  account_type: any;
  imageURLprofile = `${environment.documentUrl}`;
  imagedocURL = `${environment.labDocumentUrl}`;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientdataService: PatientdataService,
    private authService: AuthService
  ) { }

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
    // console.log('---------',data);
    this.patientdataService.profile(data).subscribe(
      (result) => {
        // console.log('Data = ', result.data);
        if (result.data.date_of_birth != null) {
          const convertAge = new Date(result.data.date_of_birth);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
        else {
          this.showAge = '-';
        }
        this.Users = result.data;
        // console.log(this.Users);


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
      role_id: 3,
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
      // Swal.fire(
      //   // 'New Password And Confirm Password Does Not Match',
      //   '<p>New Password And Confirm Password Does Not Match</p>',
      //   // error,
      //   // 'error'
      // )
    } else {
      const user_passDetail = {
        "id": this.authService.currentUserValue.userid,
        "old_password": data.opassword,
        "password": data.npassword
      };

      this.patientdataService.updatePassword(user_passDetail).subscribe(
        (result) => {
          if (result.status_code == 200) {
            this.success_message = true;
            this.error_message = false;
            setTimeout(() => {
              this.success_message = false;
              this.router.navigate(["/doctor/dashboard"]);
            }, 2000);
            Swal.fire(
              '',
              result.message,
              'success'
            )
          }
          if (this.profilepassform.valid) {
            this.profilepassform.reset();
          }
          // else{
          //   Swal.fire(
          //     '',
          //     result.message,
          //     'error'
          //   )
          // }
        },
        (err) => {
          Swal.fire(
            '',
            err,
            'error'
          )
        }
      );
      // this.router.navigate(["/authentication/signin"]);
    }
  }
}