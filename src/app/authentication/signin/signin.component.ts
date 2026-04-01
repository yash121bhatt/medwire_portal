import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  userType: string;
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  checkedValueFirst =true;
  roleBtnCondition :boolean = false;
  user_role_id : any = 2;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  setUserType(id){
    if(id == "4"){
      this.userType = "Radiology";
      this.user_role_id = 4;
    }else if(id == "3"){
     this.userType = "Laboratory";
     this.user_role_id = 3;
    }else if(id == "2"){
     this.userType = "Patient";
     this.user_role_id = 2;
   }else if(id == "8"){
    this.user_role_id = 8;
    this.userType = "Clinic/Hospital";
   }else if(id == "5"){
    this.user_role_id = 5;
     this.userType = "Doctor";
   }else if(id == "6"){
    this.user_role_id = 6;
     this.userType = "Staff";
   }else if(id == "7"){
    this.user_role_id = 7;
     this.userType = 'Prescription Writer';
   }
 }


  ngOnInit() {
    // AFTER WE CREATED BASED ON ROLE
    let role_id = this.route.snapshot.paramMap.get("user_role_id");
    if(localStorage.getItem('currentUser')){
      const role = this.authService.currentUserValue.role;
      const userID = this.authService.currentUserValue.userid;
      if (role === Role.laboratories) {
        this.router.navigate(["/doctor/dashboard"]);
      } else if (role === Role.patient) {
       
        this.router.navigate(["/patient/dashboard/"+btoa(userID)]);
      }else if (role === Role.radiology) {
        this.router.navigate(["/radiology/dashboard"]);
      } else {
        this.router.navigate(["/authentication/signin"]);
      }
    
    }
    if(role_id){
      this.setUserType(role_id);
      if(localStorage.getItem('remeberMe')){
        const remebermeDetail = JSON.parse(localStorage.getItem('remeberMe'));
        this.authForm = this.formBuilder.group({
          username: [remebermeDetail.email_mobile??'', Validators.required],
          password: [remebermeDetail.password??'', Validators.required],
          roleid:[remebermeDetail.roleid??'2'],
          rememberme:[this.checkedValueFirst],   
        });
        // this.userType = remebermeDetail.userType??'Patient';
      }
      else{
        this.authForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          roleid:role_id??'2',
          rememberme:['false'],   
        
        });
        // this.userType = 'Patient';
       
      }
    }else{
      if(localStorage.getItem('remeberMe')){
        const remebermeDetail = JSON.parse(localStorage.getItem('remeberMe'));
        this.authForm = this.formBuilder.group({
          username: [remebermeDetail.email_mobile??'', Validators.required],
          password: [remebermeDetail.password??'', Validators.required],
          roleid:[remebermeDetail.roleid??'2'],
          rememberme:[this.checkedValueFirst],   
        });
        this.user_role_id = remebermeDetail.roleid??'2'
        this.userType = remebermeDetail.userType??'Patient';
      }
      else{
        this.authForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          roleid:['2'],
          rememberme:['false'],   
        
        });
        this.userType = 'Patient';
        this.user_role_id = 2;
      }
    }
    

   
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@hospital.org");
    this.authForm.get("password").setValue("admin@123");
    this.userType = 'Admin';
  }
  
  patientSet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("2");
    this.userType = 'Patient';
    this.roleBtnCondition = false;
    this.user_role_id = 2;
  }
  laboraterySet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("3");
    this.userType = 'Laboratory';
    this.roleBtnCondition = false;
    this.user_role_id = 3;
  }
  radiologySet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("4");
    this.userType = 'Radiology';
    this.roleBtnCondition = false;
    this.user_role_id = 4
  }

  doctorSet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("5");
    this.userType = 'Doctor';
    this.user_role_id = 5;
  }
  clinicSet() {
    this.roleBtnCondition = true;
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("8");
    this.userType = 'Clinic/Hospital';
    this.user_role_id = 8;
  }

  operatorSet(){
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("6");
    this.userType = 'Staff';
    this.user_role_id = 6;
  }

  prescriptionW(){
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
    this.authForm.get("roleid").setValue("7");
    this.userType = 'Prescription Writer';
    this.user_role_id = 7;
  }
  

  onSubmit(data) {
 
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
     // this.error = "Username and Password not valid !";
     this.loading = false;
      return;
    } else {
      this.subs.sink = this.authService
        .login(data.username, data.password,this.user_role_id)
        .subscribe(
          (res) => {
            if (res) {
              if(res.status_code===203){
                this.error = 'Account is not verified!';
                localStorage.setItem("regToken",res.token);
                setTimeout(() => {
                this.router.navigate(["/authentication/registerotpsubmit"]);
                }, 3000);
              }
              else{
                setTimeout(() => {

                  if(data.rememberme==true){
                    const remeberMe = {
                      email_mobile : data.username,
                      password :data.password,
                      roleid : this.user_role_id,
                      userType : this.userType
                    }
                    localStorage.setItem("remeberMe",JSON.stringify(remeberMe));
                  }
                  else{
                    const remeberMe = {
                      email_mobile : null,
                      password :null,
                      roleid : null,
                      userType : null
                    }
                    localStorage.setItem("remeberMe",JSON.stringify(remeberMe));
                    //localStorage.removeItem("remeberMe");
                  }
                  const role = this.authService.currentUserValue.role;
                  const userID = this.authService.currentUserValue.userid;
                  if (role === Role.All || role === Role.Admin) {
                    //this.router.navigate(["/admin/dashboard"]);
                  } 
                  else if (role === Role.laboratories) {
                    this.router.navigate(["/doctor/dashboard"]);
                  } 
                  else if (role === Role.patient) {
                    this.router.navigate(["/patient/dashboard/"+btoa(userID)]);
                  }
                  else if (role === Role.radiology) {
                    this.router.navigate(["/radiology/dashboard"]);
                  } 
                  else if (role === Role.clinic ){
                    this.router.navigate(["/clinic/dashboard"]);
                  }
                  else if (role === Role.staff || role === Role.receiptionist || role === Role.prescription_writer) {
                    this.router.navigate(["/staff/dashboard"]);
                  }
                  else if (role === Role.doctor) {
                    this.router.navigate(["/doctors/dashboard"]);
                  } 
                  else {
                    this.router.navigate(["/authentication/signin"]);
                  }
                  this.loading = false;
                }, 1500);

              }
              
            } else {
              this.error = "Invalid Login";
            }
          },
          (error) => {
            
            this.error = error;
            this.submitted = false;
            this.loading = false;
            
            setTimeout(() => {
              this.error = '';
            }, 5000);
            
          }
        );
    }
  }
}