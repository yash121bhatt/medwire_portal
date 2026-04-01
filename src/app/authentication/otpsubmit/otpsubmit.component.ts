import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientdataService } from "../../services/patientdata.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otpsubmit',
  templateUrl: './otpsubmit.component.html',
  styleUrls: ['./otpsubmit.component.sass']
})
export class OtpsubmitComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  success_message:boolean= false;
  error_message:boolean = false;
  unseen_email :string;
  error_text: any;

  display: any;
  resendOtp: boolean = false;
  displayTimer: boolean = false;
  title = 'otp';
  prefix_text: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientdataService:PatientdataService
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      emailotp: [""],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
      var x = JSON.parse(localStorage.getItem('forgotEmail')).email;

      this.unseen_email = x.substring(0, 2)+'*******'+x.substring(8, 100);
      this.start(1) ;
  }
  get f() {
    return this.authForm.controls;
  }
  resend_otp(){
   
     this.patientdataService.forgotpassword(JSON.parse(localStorage.getItem('forgotEmail'))).subscribe(
      (result)=>{
        Swal.fire(
          '',
          'OTP Resend Successfully',
          'success'
        )
        this.start(1);
        localStorage.setItem('regForgetToken',result.token);
        
      },
      (err)=>{
        Swal.fire(
          '',
          err.message,
          'error'
        )
      }
     );
  }
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid

    if (this.authForm.invalid) {
      return;
    } else {
      const dataSend = {
        verify_token : localStorage.getItem('regForgetToken'),
        otp          :data.emailotp
      }

      this.patientdataService.otpverify(dataSend).subscribe(
        (result)=>{
          Swal.fire(
            '',
            'OTP Verification Successful',
            'success'
          )
          localStorage.setItem('forgotOtp',data.emailotp);
          this.router.navigate(["/authentication/resetpassword"]);
        },
        (err)=>{
          Swal.fire(
            '',
            err,
            'error'
          )
          //console.log(err);
        }
      );
      // if(localStorage.getItem('forgotOtp')==data.emailotp){
      //   this.success_message=true;
      //   this.error_message=false;
         
      //   setTimeout(() => {
      //     this.router.navigate(["/authentication/resetpassword"]);
      //   }, 2000);

      // }
      //   else{
      //     this.success_message=false;
      //     this.error_message=true;
          
      //   }
      //this.router.navigate(["/authentication/resetpassword"]);
    }
  }


  start(minute) {
    this.displayTimer = true;
    this.resendOtp = false;
    // let minute = 1;
    let seconds = minute * 60;
    let textSec: any = '0';
    let statSec = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      // if (statSec < 10) textSec = "0" + statSec;
      // textSec = statSec;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else {
        textSec = statSec;
      }

      // this.display = prefix + Math.floor(seconds / 60) + ":" + textSec;
      this.display = `${textSec}`;
      this.prefix_text="Sec to Resend OTP";

      if (seconds == 0) {
        clearInterval(timer);
        this.resendOtp = true;
        this.displayTimer = false;
      }
    }, 1000);
  }
}

