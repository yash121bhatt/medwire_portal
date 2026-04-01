import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { User } from "src/app/core/models/user";
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { formatDate } from '@fullcalendar/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

@Injectable()
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.sass']
})
export class EditprofileComponent implements OnInit {
  private form : FormData;
  editprofiletForm: FormGroup;
  submitted: boolean;
  registrationForm: any;
  user_id: number;
  token: string;
  Users:any;
  username:string;
  last_name:string;
  email:string;
  mobileno:number;
  adharcardno:number;
  gender:string;
  dob : Date;
  success_message:boolean;
  error_message : boolean;
  error_message_text : string;
  profile_image : any;
  maxDate = new Date();
  parameter_id : string;
  imageprofile: any;
  address: any;
  pincode: any;
  alternateno: any;
  blood_group: any;

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private patientdataService : PatientdataService,
    private authService: AuthService,
    private http: HttpClient,
    private dateAdapter: DateAdapter<Date>
  ) {
   // this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

   }

  ngOnInit(): void {
  
    this.editprofiletForm = this.formBuilder.group({
      username: ["", [Validators.required,Validators.pattern("[A-Za-z ]{1,32}")]],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      gender:["", Validators.required],
      dob: ["",Validators.required],
      address:["",Validators.required],
      pincode:["",Validators.required],
      blood_group:["",Validators.required],
      alternateno:[""],
      file: [null],
    })
    ;
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    this.patientdataService.profile(data).subscribe(
      (result) => {
       
        this.Users = result.data;
        
        this.username = result.data[0].first_name;
        this.email = result.data[0].email;
        this.mobileno = result.data[0].mobile;
        this.gender = result.data[0].gender;
        this.address = result.data[0].address;
        this.pincode = result.data[0].pin_code;
        this.alternateno = result.data[0].alternate_mobile;
        this.dob = new Date(result.data[0].date_of_birth??'');
        this.blood_group = result.data[0].blood_group,

        this.imageprofile = result.data[0].imgName!='' && result.data[0].imgName!=null ?result.data[0].imgName:'demouser.png';
        this.imageUrl = this.imageURLprofile+this.imageprofile;        
      },
      (err) => {
        console.log(err);
      }
    );
    
  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;
  // imageURLprofile = `${environment.documentUrl}`;
  imageURLprofile = "";

  uploadfileForm = this.fb.group({
    file: [null],
  });
  
  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }
 
  onSubmit() {
      
     
    // stop here if form is invalid
    if (this.editprofiletForm.invalid) {
      window.scroll(0,1);
      return;
    } else {

    this.form = new FormData();
    this.form.append('first_name',this.editprofiletForm.value.username);
    this.form.append('date_of_birth',this.editprofiletForm.value.dob);
    this.form.append('mobile',this.editprofiletForm.value.mobile);
    this.form.append('gender',this.editprofiletForm.value.gender);
    this.form.append('address',this.editprofiletForm.value.address);
    this.form.append('pin_code',this.editprofiletForm.value.pincode);
    this.form.append('blood_group',this.editprofiletForm.value.blood_group);
    this.form.append('alternate_mobile_number',this.editprofiletForm.value.alternateno);
    this.form.append('user_id',this.authService.currentUserValue.userid);
    this.form.append('profile_image',this.profile_image);

      this.patientdataService.profileupdate(this.form).subscribe(
        (result) => {
          this.http.post<any>(`${environment.apiUrl}auth/profile`, {
            id:  this.authService.currentUserValue.userid,
           },{headers:{'x-access-token': this.authService.currentUserValue.token}}).subscribe(
            (result_profile)=>{
            
            const user_detail ={
            userid:result_profile.data[0].id,
            img: result_profile.data[0].img??"assets/image/user/demouser.png",
            username: result_profile.data[0].username,
            password: "",
            firstName: result_profile.data[0].first_name,
            lastName: result_profile.data[0].last_name,
            role:  this.authService.currentUserValue.role,
            roleID :result_profile.data[0].role_id,
            token:  this.authService.currentUserValue.token,
            address:result_profile.data[0].address,
            pin_code:result_profile.data[0].pin_code,
            image_name:result_profile.data[0].imgName!='' && result_profile.data[0].imgName!=null?result_profile.data[0].imgName:'demouser.png'
          
          };
          Swal.fire(
                '',
                result.message,
                'success'
              )
          localStorage.setItem("currentUser", JSON.stringify(user_detail));
              setTimeout(() => {
                //this.router.navigate(["/patient/myprofile"]);
                this.router.navigate(["/patient/myprofile"]).then(() => {
                   window.location.reload();
                 });
              }, 2000);

              
        },
        (err) => {
          Swal.fire(
            '',
            err,
            'error'
          )
         
        }
      );
      //this.router.navigate(["/patient/myprofile"]);
    }
      )
    
  }
  }
}





