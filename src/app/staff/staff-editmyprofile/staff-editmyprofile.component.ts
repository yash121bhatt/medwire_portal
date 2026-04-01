import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-staff-editmyprofile',
  templateUrl: './staff-editmyprofile.component.html',
  styleUrls: ['./staff-editmyprofile.component.sass']
})
export class StaffEditmyprofileComponent implements OnInit {
  private form : FormData;
  editprofiletForm: FormGroup;
  submitted: boolean;
  registrationForm: any;
  user_id: any;
  token: any;
  Users:any;
  first_name:any;
  email:any;
  address:any;
  pin_code:any;
  profile_image:any;
  mobile:any;
  imagedocURL = `${environment.labDocumentUrl}`;
  gender: any;
  dob: any;
  maxDate = new Date();
  imageprofile: any;
  imageURLprofile = `${environment.documentUrl}`;
  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private clinicServices : ClinicServiceService,
    private authService: AuthService,
    private http: HttpClient,
    private dateAdapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {
    this.editprofiletForm = this.formBuilder.group({
      first_name: ["", [Validators.required,Validators.pattern("[A-Za-z ]{1,32}")]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)], ],
      // mobile_number: ["", [Validators.required, Validators.pattern("[789][0-9]{9}")]],
      mobile: [""],
      // adharno: ["", [Validators.required, Validators.pattern("[0-9]{12}")]],
      // telephone_no: [""],
      // password: ["", Validators.required],
      // cpassword: ["", Validators.required],
      dob    :["",Validators.required],
      gender:["",Validators.required],
      address: ["", Validators.required],
      pin_code: ["", [Validators.required, Validators.pattern("[0-9]{6}")]],
    });

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    this.clinicServices.profileStaff(data).subscribe(
      (res:any) => {
       
        this.Users = Array(res.data);
        this.first_name = res.data[0].first_name;
        this.email = res.data[0].email;
        this.mobile = res.data[0].mobile;
        this.profile_image = res.data[0].imgName??'demouser.png';
        this.address = res.data[0].address;
        this.pin_code = res.data[0].pin_code;
        this.gender   = res.data[0].gender;
        this.dob      = new Date(res.data[0].date_of_birth);
        this.imageprofile =  res.data[0].imgName!='' && res.data[0].imgName!=null ?res.data[0].imgName:'demouser.png';
        this.imageUrl = this.imageURLprofile+this.imageprofile;
      },
      (error:any) => {
        console.log(error);
      }
    );
    
    
  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;


  uploadfileForm = this.fb.group({
    file: [null],
  });
  
  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }

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
 
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editprofiletForm.invalid) {
      return;
    } else {


      this.form = new FormData();
    this.form.append('first_name',this.editprofiletForm.value.first_name);
    this.form.append('mobile',this.editprofiletForm.value.mobile);
    this.form.append('email',this.editprofiletForm.value.email);
    this.form.append('user_id',this.authService.currentUserValue.userid);
    this.form.append('address',this.editprofiletForm.value.address);
    this.form.append('pin_code',this.editprofiletForm.value.pin_code);
    this.form.append('date_of_birth',this.editprofiletForm.value.dob);
    this.form.append('gender',this.editprofiletForm.value.gender);
    this.form.append('profile_image',this.profile_image);
    this.clinicServices.profileupdate(this.form).subscribe((res:any)=>{
     
      this.http.post<any>(`${environment.apiUrl}auth/profile`, {
        id:  this.authService.currentUserValue.userid,
       },{headers:{'x-access-token': this.authService.currentUserValue.token}}).subscribe(
        (result_profile)=>{
        
        const user_detail ={
        userid:result_profile.data[0].id,
        profile_image: result_profile.data[0].profile_image??"assets/image/user/demouser.png",
        username: result_profile.data[0].username,
        email: result_profile.data[0].email,
        mobile: result_profile.data[0].mobile,
        firstName: result_profile.data[0].first_name,
        lastName: result_profile.data[0].last_name,
        address: result_profile.data[0].address,
        pin_code: result_profile.data[0].pin_code,
        roleID : result_profile.data[0].role_id,
        role:  this.authService.currentUserValue.role,
        token:  this.authService.currentUserValue.token,
        image_name:result_profile.data[0].imgName!=null && result_profile.data[0].imgName!="" ?  result_profile.data[0].imgName : 'demouser.png'
      };
      localStorage.setItem("currentUser", JSON.stringify(user_detail));
          // setTimeout(() => {
          //   this.router.navigate(["/staff/staff-myprofile"]).then(() => {
          //     window.location.reload();
          //   });
          // }, 1000);

          // Swal.fire(
          //   '',
          //   res.message,
          //   'success'
          // )
          Swal.fire(
            '',
            res.message,
            'success'
          )
          setTimeout(() => {
            this.router.navigate(["/staff/staff-myprofile"]).then(() => {
              window.location.reload();
            });
          }, 1000);
    },
    (err) => {
      Swal.fire(
        '',
        err,
        'error'
      )
     
    }
  );
      
    })

    //  this.router.navigate(["/staff/staff-myprofile"]);
    }
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to edit profile!')
      return false;
    } else {
      // console.log(this.registrationForm.value)
    }
  }
}