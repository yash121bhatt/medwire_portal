import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { PatientdataService } from "../../services/patientdata.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.sass']
})
export class ResetpasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientdataService:PatientdataService
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
     
      password: ["", [Validators.required,
      Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
      )] ],
      cpassword: ["", Validators.required],
    },
    {
      validator: ConfirmedValidator('password', 'cpassword')
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get fun() {
    return this.authForm.controls;
  }
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      const forgot_detail = {
        verify_token : localStorage.getItem('regForgetToken'),
        password     :data.password,
        otp   :localStorage.getItem('forgotOtp')
      };
      this.patientdataService.resetpassword(forgot_detail).subscribe(
        (result)=>{
           this.success_message= true;
          this.error_message = false;

          setTimeout(() => {
            localStorage.removeItem("forgotEmail");
            localStorage.removeItem("forgotOtp");
           this.router.navigate(["/authentication/signin"]);
          }, 2000);
        },
        (err)=>{
          this.success_message= false;
          this.error_message = true;
          this.error_message_text = err;
        }
      )

     // this.router.navigate(["/authentication/signin"]);
    }
  }
}
