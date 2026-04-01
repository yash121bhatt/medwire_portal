import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.sass']
})
export class EditStaffComponent implements OnInit {
  editstaffForm: FormGroup;
  submitted = false;
  returnUrl: string;
  full_name : string;
  date_of_birth : Date;
  mobile_number : number;
  // aadhar_card_number : string;
  email_id : string;
  role_id : string;
  gender : string;
  profile_image:any
  form : FormData;
  imageURL = `${environment.documentUrl}`;
  imageName : any;
  constructor(private fb: FormBuilder , private activatedRoute:ActivatedRoute,private authService : AuthService , private clinicService : ClinicServiceService , private router : Router) {
    this.editstaffForm = this.fb.group({
      full_name: ["",[Validators.required]],
      date_of_birth: ["",[Validators.required]],
      mobile_number: ["", [Validators.pattern("[6789][0-9]{9}")]],
      // aadhar_card_number:  ["",[Validators.required]],
      email_id: [ "", [Validators.email, Validators.minLength(5)]],
      role_id: ["",[Validators.required]],
      gender: ["",[Validators.required]],
      profile_image: [""],
    });
    
  }

  ngOnInit(){
     let data = {
        staff_id : this.activatedRoute.snapshot.paramMap.get("id")
     }
       this.clinicService.staffDetail(data).subscribe(
        (result) => {
          if(result.status_code==200){
            // console.log(result);
            let staffData = result.data[0];
             this.full_name = staffData.full_name;
             this.date_of_birth = new Date(staffData.date_of_birth);
            //  this.aadhar_card_number = staffData.aadhar_card_number;
             this.gender = staffData.gender;
             this.mobile_number = staffData.mobile_number;
             this.email_id = staffData.email;
             this.role_id = staffData.role_id;
             this.imageName = staffData.profile_image_name??'demouser.png';
          }
        },
        (err) => {
          console.log(err);
        }
      );
  } 
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
      // console.log(this.profile_image)
    }
  }
  onSubmit() {
     let staff_id = this.activatedRoute.snapshot.paramMap.get("id");
    let clinic_id =   this.authService.currentUserValue.userid;
    this.form = new FormData();
    this.form.append("full_name",this.editstaffForm.value.full_name);
    this.form.append("date_of_birth",this.editstaffForm.value.date_of_birth);
    this.form.append("mobile_number",this.editstaffForm.value.mobile_number);
    // this.form.append("aadhar_card_number",this.editstaffForm.value.aadhar_card_number);
    this.form.append("email_id",this.editstaffForm.value.email_id);
    this.form.append("role_id",this.editstaffForm.value.role_id);
    this.form.append("gender",this.editstaffForm.value.gender);
    if(this.profile_image){
    this.form.append("profile_image",this.profile_image);  
    }
    this.form.append("clinic_id",clinic_id);
    this.form.append("staff_id",staff_id);
    
    this.clinicService.updateStaff(this.form).subscribe (
      (result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/clinic/staff-management/staff-list']);
          }, 600 );

        }
        Swal.fire(
          '',
          result.message,
          'success'
        )
        
      }, 
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err,
          'error'
        )
      } ) ;
      this.submitted = true;
  }
}

