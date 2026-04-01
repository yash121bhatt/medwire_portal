import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { AuthService } from "src/app/core/service/auth.service";
import { PatientdataService } from "src/app/services/patientdata.service";



@Component({
  selector: 'app-registerotpsubmit',
  templateUrl: './registerotpsubmit.component.html',
  styleUrls: ['./registerotpsubmit.component.sass']
})
export class RegisterotpsubmitComponent implements OnInit {
  display: any;
  regiotpForm: FormGroup;
  submitted = false;
  returnUrl: string;
  success_message:boolean;
  error_message:boolean;
  resendOtp: boolean = false;
  displayTimer: boolean = false;
  title = 'otp';
  prefix_text: string;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService,
    private patientdataService : PatientdataService
  ) { }

  ngOnInit() {
    this.regiotpForm = this.formBuilder.group({
      mobile: [""],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.success_message=false;
    this.start(1);
  }
  get f() {
    return this.regiotpForm.controls;
  }
  onSubmit(data) {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.regiotpForm.invalid) {
      return;
    } else {
      const dataOtp ={
        verify_token : localStorage.getItem('regToken'),
        otp : data.mobile
      }


      this.patientdataService.verifyingOTP(dataOtp).subscribe(
        (result)=>{
          setTimeout(() => {
            this.router.navigate(["/authentication/signin"]);
          }, 500);
          Swal.fire(
            '',
            'OTP Verification Successful !',
            'success'
          )
        },
        (err)=>{
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

  resendOtpPasscode(){

   const data ={
    verify_token : localStorage.getItem('regToken'),
   }
   this.start(1);
    this.patientdataService.resendOtp(data).subscribe(
      (result)=>{
        Swal.fire(
          '',
          'OTP Resend Successfully',
          'success'
        )
 
        
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
}

