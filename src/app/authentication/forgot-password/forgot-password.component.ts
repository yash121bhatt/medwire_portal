import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientdataService } from "../../services/patientdata.service";
import { Role } from "src/app/core/models/role";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  success_message:boolean= false;
  error_message:boolean = false;
  error_text:string;
  userType: string;
  roleButtonShow:boolean= false;
  userRole_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientdataService:PatientdataService
  ) {}

  setUserType(id){
     if(id == "4"){
       this.userType = "Radiology"
     }else if(id == "3"){
      this.userType = "Laboratory"
     }else if(id == "2"){
      this.userType = "Patient"
    }else if(id == "8"){
     this.userType = "Clinic/Hospital"
    }else if(id == "5"){
      this.userType = "Doctor"
    }else if(id == "6"){
      this.userType = "Staff"
    }else if(id == "7"){
      this.userType = 'Prescription Writer';
    }
  }

  ngOnInit() {
    this.userRole_id = this.route.snapshot.paramMap.get("user_role_id");
    if(this.userRole_id){
      this.setUserType(this.userRole_id);
    } 
    this.authForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    // this.userType = Role.patient;
    // this.userRole_id = 2;
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit(data) {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
     const emailData ={
      "role_id":this.userRole_id,
      "email":data.email
     }
     this.patientdataService.forgotpassword(emailData).subscribe(
      (result)=>{
        this.success_message= true;
        this.error_message = false;
        localStorage.setItem('forgotEmail',JSON.stringify(emailData));
        localStorage.setItem('regForgetToken',result.token);
        setTimeout(() => {
          this.router.navigate(["/authentication/otpsubmit"]);
        }, 2000);
        
      },
      (err)=>{
        this.success_message=false;
        this.error_message=true;
        this.error_text=err; 
      }
     );
      //this.router.navigate(["/authentication/otpsubmit"]);
    }
    
  }


  doctorSet() {
    this.userType = "Doctor";
    this.userRole_id = 5;
  }
  clinicSet() {
    this.userType = "Clinic";
    this.roleButtonShow = true;
    this.userRole_id = 8;
  }
  staffSet() {
    this.userType = "Staff";
    this.userRole_id = 6;
  }
  laboratorySet() {
    this.userType = "Laboratory";
    this.roleButtonShow = false;
    this.userRole_id = 3;
  }
  patientSet() {
    this.userType = "Patient";
    this.userRole_id = 2;
    this.roleButtonShow = false;
  }
  radiologySet() {
    this.userType = "Radiology";
    this.roleButtonShow = false;
    this.userRole_id = 4;
  }
  prescriptionW(){
    this.userRole_id = 7;
    this.userType = 'Prescription Writer';
  }
}
