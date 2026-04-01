import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Role } from "src/app/core/models/role";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { PatientdataService } from "../../services/patientdata.service";

import { MatDialog, MatDialogConfig, MatDialogRef, } from "@angular/material/dialog";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TermConditionDialogComponent } from "./term-condition-dialog/term-condition-dialog.component";
import { AuthService } from "src/app/core/service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  authForm: FormGroup;
  labRadioForm: FormGroup;
  userType: string;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  fileToUpload: File | null = null;
  private form : FormData;
  profile_image : any;
  accept: string =".jpeg,.png,.jpg,.pdf";
  frontNameDisplay :string ;
  loading = false;
  success_message_text : any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userdata:PatientdataService,
    private dialogModel: MatDialog,
    private authService : AuthService
  ) {
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  active_formstatus_patient:boolean= true;
  active_formstatus_labRadio:boolean = false;

  ngOnInit() {
       
    if(localStorage.getItem('currentUser')){
      const role = this.authService.currentUserValue.role;
      const userID = this.authService.currentUserValue.userid;
      if (role === Role.laboratories) {
        this.router.navigate(["/doctor/visits-page"]);
      } else if (role === Role.patient) {
       
        this.router.navigate(["/patient/dashboard/"+btoa(userID)]);
      }else if (role === Role.radiology) {
        this.router.navigate(["/radiology/radiology-visits"]);
      } else {
        //this.router.navigate(["/authentication/signin"]);
      }
    
    }

    this.authForm = this.formBuilder.group({
      full_name: ["",[Validators.required,Validators.pattern("^[a-z A-Z 0-9_-]{3,32}$")]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)],],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      alernate_mobile: ["", [Validators.pattern("[6789][0-9]{9}")]],
      password: ["", [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/)]],
      cpassword: ["", Validators.required],
      boxtermcondition : ["",Validators.required],
      userrole:["patient"],
      roleid:["2"]   
    },{
      validator: ConfirmedValidator('password', 'cpassword')
    });

    this.labRadioForm = this.formBuilder.group({
     
      company_name: ["",[Validators.required,Validators.pattern("^[a-z A-Z 0-9_-]{3,32}$")]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      password: ["", [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/)]],
      cpassword: ["", Validators.required],
      checkcondition:["",Validators.required],
      userrole:[""],
      roleid:[""],
      doc_image:["",[Validators.required]]
    },{
      validator: ConfirmedValidator('password', 'cpassword')
    });

    this.userType = 'Patient';
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get fun() {
    return this.authForm.controls;
  }

  get f(){
    return this.labRadioForm.controls;
  }
  doctorSet() {
    this.userType = 'Laboratory';
    this.frontNameDisplay = 'Company Name';
    this.labRadioForm.get("userrole").setValue("laboratories");
    this.labRadioForm.get("roleid").setValue("3");
    this.active_formstatus_patient= false;
    this.active_formstatus_labRadio = true;
  }
  patientSet() {
    this.userType = 'Patient';
    this.authForm.get("userrole").setValue("patient");
    this.authForm.get("roleid").setValue("2");
    this.active_formstatus_patient= true;
    this.active_formstatus_labRadio = false;
  }
  radiologySet() {
    this.userType = 'Radiology';
    this.frontNameDisplay = 'Company Name';
    this.labRadioForm.get("userrole").setValue("radiology");
    this.labRadioForm.get("roleid").setValue("4");
    this.active_formstatus_patient= false;
    this.active_formstatus_labRadio = true;
  }
  clinicSet() {
    this.userType = 'Clinic/Hospital';
    this.frontNameDisplay = 'Clinic/Hospital Name';
    this.labRadioForm.get("userrole").setValue("clinic");
    this.labRadioForm.get("roleid").setValue("8");
    this.active_formstatus_patient= false;
    this.active_formstatus_labRadio = true;
  }


  onSubmit(data: { full_name: String; email: any; mobile: Number; password: any;userrole:String;roleid:String; alernate_mobile:number }) {
    this.submitted = true;
    this.loading   = true;
    const signup_data = {
      "username":data.full_name,
      "email":data.email,
      "mobile":data.mobile,
      "alternate_mobile":data.alernate_mobile,
      "password":data.password,
      "user_type":data.userrole,
      "role_id":data.roleid
     }
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.userdata.signUp(signup_data).subscribe(
        (result)=>{
          if(result.status=="success"){
            this.success_message=true;
            this.success_message_text = result.message;
            this.error_message = false;
            localStorage.setItem("regToken",result.data.token);
            Swal.fire(
              '',
              result.message,
              'success'
            )
            setTimeout(() => {
               this.loading = false;
              this.router.navigate(["/authentication/registerotpsubmit"]);
            }, 2000);
            
          }  
         },
       (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
        this.loading = false;
        this.error_message = true;
        this.success_message=false;
        this.error_message_text = err;
       });

       }
      //this.router.navigate(["/authentication/registerotpsubmit"]);
    }

    onSubmitbtn() {
     // "approve_document":data.doc_file
      this.submitted = true;
      if (this.labRadioForm.invalid) {
        return;
      } else {
        this.loading = true;
        this.form = new FormData();
      this.form.append('username',this.labRadioForm.value.company_name);
      this.form.append('email',this.labRadioForm.value.email);
      this.form.append('mobile',this.labRadioForm.value.mobile);
      this.form.append('password',this.labRadioForm.value.password);
      this.form.append('user_type',this.labRadioForm.value.userrole);
      this.form.append('role_id',this.labRadioForm.value.roleid);
      this.form.append('approve_document',this.profile_image);

        this.userdata.signUplabRadio(this.form).subscribe(
          (result)=>{
            if(result.status=="success"){
              // this.success_message=true;
              // this.error_message = false;
              Swal.fire(
                '',
                result.message,
                'success'
              )
             
             // localStorage.setItem("regUserID",result.data.id);
             localStorage.setItem("regToken",result.data.token);
              setTimeout(() => {
                this.loading = false;
                this.router.navigate(["/authentication/registerotpsubmit"]);
              }, 2000);
              
            }  
           },
         (err) => {
          Swal.fire(
            '',
            err,
            'error'
          )
          this.loading = false;
          this.error_message = true;
          this.success_message=false;
          this.error_message_text = err;
         });
  
         }
        //this.router.navigate(["/authentication/registerotpsubmit"]);
      }
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }

  mobileNoValidate(event){
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialogModel.open(TermConditionDialogComponent, 
    {
      width: "100%",
      disableClose: true,
    });
  }
  
  }

