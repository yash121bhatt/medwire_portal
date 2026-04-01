import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-clinic-editmyprofile',
  templateUrl: './clinic-editmyprofile.component.html',
  styleUrls: ['./clinic-editmyprofile.component.sass']
})
export class ClinicEditmyprofileComponent implements OnInit {
  editprofiletForm: FormGroup;
  form : FormData;
  submitted: boolean;
  registrationForm: any;
  user_id: any;
  Users: any;
  imageURL = `${environment.documentUrl}`;
  document : any;
  name : string;
  mobile_number : number;
  email_id : string;
  // aadhar_card_number : number;
  address :string;
  pin_code : number;
  profile_image:any;
  imageprofile: any;
  imageURLprofile = `${environment.documentUrl}`;
  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private authService : AuthService,
    private clinicService : ClinicServiceService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.editprofiletForm = this.formBuilder.group({
      full_name: ["",[Validators.required,Validators.pattern("[A-Za-z ]{1,32}")]],
      email_id: ["", [Validators.required , Validators.email, Validators.minLength(5)]],
      mobile: [""],
      // aadhar_card_number: ["", [Validators.required,Validators.pattern("[0-9]{12}")]],
      address: ["",[Validators.required]],
      pin_code: ["", [Validators.required,Validators.pattern("[0-9]{6}")]],
      profile_image : [""]
    });

    this.user_id = this.authService.currentUserValue.userid;
    const data = { clinic_id: this.user_id };
    this.clinicService.profile(data).subscribe(
      (result) => {
        if(result.status_code==200){
          this.Users = result.profile_details[0]; 
          this.document = this.Users.profile_pic_name ?? "demouser.png";
          this.name = this.Users.name ?? "-";
          this.mobile_number = this.Users.mobile_number ?? "-";
          this.email_id = this.Users.email_id ?? "-";
          // this.aadhar_card_number = this.Users.aadhar_card_number ?? "-";
          this.address = this.Users.address ?? "-";
          this.pin_code = this.Users.pin_code ?? "-";
          this.imageprofile = this.Users.profile_pic_name!='' && this.Users.profile_pic_name!=null ?this.Users.profile_pic_name:'demouser.png';
          this.imageUrl = this.imageURLprofile+this.imageprofile;
        }
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


  uploadfileForm = this.fb.group({
    file: [null],
  });
  
  // uploadFile(event) {
  //   let reader = new FileReader(); 
  //   let file = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.imageUrl = reader.result;
  //       this.registrationForm.patchValue({
  //         file: reader.result
  //       });
  //       this.editFile = false;
  //       this.removeUpload = true;
  //     }
     
  //     this.cd.markForCheck();        
  //   }
  // }
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
    if(this.editprofiletForm.valid){
      // let aadharNo = this.editprofiletForm.value.aadhar_card_number.replace(/\s/g, "");
      this.submitted = true;
      this.form = new FormData();
      this.form.append("full_name",this.editprofiletForm.value.full_name);
      this.form.append("email_id",this.editprofiletForm.value.email_id);
      this.form.append("mobile",this.editprofiletForm.value.mobile);
      // this.form.append("aadhar_card_number",this.editprofiletForm.value.aadhar_card_number);
      this.form.append("address",this.editprofiletForm.value.address);
      this.form.append("pin_code",this.editprofiletForm.value.pin_code);
      this.form.append("profile_image",this.profile_image);
      this.form.append("user_id",this.user_id);
      this.clinicService.updateProfile(this.form).subscribe (
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
                this.router.navigate(["/clinic/clinic-myprofile"]).then(() => {
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
         } );
       this.submitted = true;
    }else{
      Swal.fire(
        '',
        "Failed to update. Please enter valid data.",
        'error'
      )
    }
   
  }
}