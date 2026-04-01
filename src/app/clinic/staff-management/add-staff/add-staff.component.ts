import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass']
})
export class AddStaffComponent {
  addstaffForm: FormGroup;
  submitted = false;
  returnUrl: string;
  accept: string =".jpeg,.png,.jpg";
  profile_image : any;
  private form : FormData;
  today  = new Date();
  constructor(private fb: FormBuilder , private authService : AuthService ,private router : Router, private clinicService: ClinicServiceService) {
    this.addstaffForm = this.fb.group({
      full_name: ["", [Validators.required]],
      date_of_birth: ["", [Validators.required]],
      mobile_number: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      // aadhar_card_number:  ["", [Validators.required]],
      email_id: [ "", [Validators.required, Validators.email, Validators.minLength(5)]],
      role_id: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      profile_image: [""],
    }); 
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
    let clinic_id =   this.authService.currentUserValue.userid;
    this.submitted = true;
    this.form = new FormData();
    // let dob = this.addstaffForm.value.date_of_birth|Date
    this.form.append("full_name",this.addstaffForm.value.full_name);
    this.form.append("date_of_birth",this.addstaffForm.value.date_of_birth);
    this.form.append("mobile_number",this.addstaffForm.value.mobile_number);
    // this.form.append("aadhar_card_number",this.addstaffForm.value.aadhar_card_number);
    this.form.append("email_id",this.addstaffForm.value.email_id);
    this.form.append("role_id",this.addstaffForm.value.role_id);
    this.form.append("gender",this.addstaffForm.value.gender);
    this.form.append("profile_image",this.profile_image);
    this.form.append("clinic_id",clinic_id);
    this.clinicService.addStaff(this.form).subscribe (
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

  }
}

