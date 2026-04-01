import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "src/app/core/service/auth.service";
import { User } from "src/app/core/models/user";
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { DoctorServiceService } from 'src/app/services/doctor-service.service';



@Component({
  selector: 'app-esignature',
  templateUrl: './esignature.component.html',
  styleUrls: ['./esignature.component.sass']
})
export class EsignatureComponent implements OnInit {
  private form : FormData;
  editprofiletForm: FormGroup;
  submitted: boolean;
  registrationForm: any;
  profile_image : any;
  user_id: any;
  token: string;
  imageprofile: any;
  imageURLprofile = `${environment.documentUrl}`;
  Users: any[];
  signature_file_path : any;
  signURLprofile = `${environment.signUrl}`;

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private doctorServiceService : DoctorServiceService
  ) {

   }

  ngOnInit(): void {
    this.uploadfileForm = this.formBuilder.group({
      file: [null],
    });
    
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { user_id: this.authService.currentUserValue.userid };
    this.doctorServiceService.esignaturGet(data).subscribe(
      (result) => {

        this.Users = Array(result.data);
        this.imageprofile = result.data.signature_file_name != '' && result.data.signature_file_name != null ? result.data.signature_file_name : 'demouser.png';
        this.imageUrl = this.signURLprofile + this.imageprofile;
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
 
  // onSubmit() {
  //   this.submitted = true;
   
  //   if (this.editprofiletForm.invalid) {
  //     return;
  //   } else {
  //     this.router.navigate(["/doctor/labmyprofile"]);
  //   }
  //   this.submitted = true;
  //   if(!this.registrationForm.valid) {
  //     alert('Please fill all the required fields to edit profile!')
  //     return false;
  //   } else {
  //     console.log(this.registrationForm.value)
  //   }
  // }

async fileChange($event){
  this.profile_image = null;
  if($event && $event.length){
    this.profile_image = $event[0];
  }
} 


  submit(){
    this.form = new FormData();
    this.form.append('user_id',this.authService.currentUserValue.userid);
    this.form.append('signature',this.profile_image);

    this.doctorServiceService.esignaturAdd(this.form).subscribe(
      (result)=>{
        Swal.fire(
          '',
          result.message,
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


  }
}