import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.sass']
})
export class EditNotificationComponent {
  editnotificationForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  doctor = false;
  general = false;
  pincode_radio = false;
  patient_radio = false;
  isHidden=true;
  public selection: string;
  public selectiontwo: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  public variables3 = [];
  public filteredList3:any;
  public variables4 = [];
  public filteredList4:any;
  user_id:any;
  role_id : any = 8;
  patient_ids :any = "";
  doctor_id : any = 0;
  notification_for : any ;
  notification_id : any ;
  notification_sent_by : any ;
  notification_title:any;
  notification_date_time:any;
  description:any;
  patient_pin_code : any = 0;
  date_time = false;
  notification_type : any;
  currentDate : Date = new Date()

  changedivthree(divid){
    if (divid === "onTheSpot") {
      // this.pincode_radio = true;
      this.date_time = false;
      
    }
    else if (divid === "dateandTime") {
      // this.pincode_radio = false;
      this.date_time = true;
    }

  }
  
  toggle(){
    this.isHidden=!this.isHidden;
  }

  ngOnInit(): void {
    this.user_id = this.authService.currentUserValue.userid;
    this.notification_id = this.activatedRoute.snapshot.paramMap.get("id");
    this.singleNotification()
  }

  singleNotification(){
    let data = {
      notification_id : this.notification_id
    }
    this.clinicService.singleNotification(data).subscribe((result)=>{
       if(result.status_code == 200){
           let data = result.data[0];
           this.notification_for = data.notification_for;
           this.notification_sent_by = data.notification_sent_by;
           this.notification_title = data.notification_title;
           this.notification_date_time = data.notification_date_time;
           this.description = data.description;
           this.notification_type = data.type;
           
           if(this.notification_type == "1"){
            this.date_time = false;
            this.notification_type = "on_spot";
           }else if(this.notification_type == "2"){
            this.date_time = true; 
            this.notification_type = "date_time";
          }

           if(this.notification_for == "doctor"){
            this.doctor = true;
            this.general = true;
            this.doctor_id = data.doctor_id;
            let testdata = {
                clinic_id : this.user_id
            }
            this.clinicService.doctorList(testdata).subscribe((result)=>{
              this.variables3 = result.data;
              this.filteredList3 = this.variables3.slice();
            })

           }else if(this.notification_for == "general"){
            this.general = true;
            this.doctor = false;
           }

           if(this.notification_sent_by == "pin_code"){
              this.pincode_radio = true;
              this.patient_radio = false;
              this.patient_pin_code = data.pin_code
           }else if(this.notification_sent_by == "patient"){
            this.pincode_radio = false;
            this.patient_radio = true;
            this.patient_ids = data.patient_ids.split(",");
            let patientIds = []
            for(let i = 0 ; i< this.patient_ids.length ; i++){
              patientIds.push(parseInt(this.patient_ids[i]));
            }
            this.patient_ids = patientIds; 

            let testdata = {
              user_id : this.user_id,
              role_id : this.role_id
            }
             this.clinicService.getPatient(testdata).subscribe((result)=>{
             this.variables4 = result.data;
             this.filteredList4 = this.variables4.slice();
            })
           }
       }
    });
  }



  changediv(divid) {
    if (divid === "doctor_visit") {
      this.doctor = true;
      this.general = true;
      let data = {
          clinic_id : this.user_id
      }
      this.clinicService.doctorList(data).subscribe((result)=>{
          this.variables3 = result.data;
          this.filteredList3 = this.variables3.slice();
      });
    }
    else if (divid === "general_visit") {
      this.doctor = false;
      this.general = true;
    }

  }
  changedivtwo(divid) {
    if (divid === "pincode_view") {
      this.pincode_radio = true;
      this.patient_radio = false;
    }
    else if (divid === "patient_view") {
      this.pincode_radio = false;
      this.patient_radio = true;

      let data = {
          user_id : this.user_id,
          role_id : this.role_id
      }
      this.clinicService.getPatient(data).subscribe((result)=>{
        this.variables4 = result.data;
        this.filteredList4 = this.variables4.slice();
      });
    }

  }
  constructor(private router : Router,private fb: FormBuilder  ,private activatedRoute : ActivatedRoute, private clinicService:ClinicServiceService , private authService:AuthService) {
    this.editnotificationForm = this.fb.group
    ({
      notification_for: ["", [Validators.required]],
      doctor_id: [""],
      notification_sent_by: ["", [Validators.required]],
      patient_pin_code: [""],
      patient_ids: [""],
      notification_date_time: ["", [Validators.required]],
      notification_title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      notification_type: ["", [Validators.required]]
    });
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
    let notification_date_time;
    let notification_type;
     if(this.editnotificationForm.value.notification_sent_by == "pin_code"){
       this.patient_pin_code =  this.editnotificationForm.value.patient_pin_code
     }
     if(this.editnotificationForm.value.notification_sent_by == "patient"){
       this.patient_ids = this.editnotificationForm.value.patient_ids
     }
     if(this.editnotificationForm.value.notification_for == "doctor"){
       this.doctor_id = this.editnotificationForm.value.doctor_id
     }
     if(this.editnotificationForm.value.notification_type == "on_spot"){
      notification_date_time = new Date();
      notification_type = 1;
    }
    if(this.editnotificationForm.value.notification_type == "date_time"){
      notification_date_time = this.editnotificationForm.value.notification_date_time
      notification_type = 2;
    }
     let data = {
       user_id : this.user_id,
       role_id : this.role_id,
       doctor_id : this.doctor_id,
       notification_id : this.notification_id,
       notification_for : this.editnotificationForm.value.notification_for,
       notification_sent_by : this.editnotificationForm.value.notification_sent_by,
       patient_pin_code : this.patient_pin_code,
       patient_ids : this.patient_ids.toString(),
       notification_title : this.editnotificationForm.value.notification_title,
       notification_date_time : this.editnotificationForm.value.notification_date_time,
       description : this.editnotificationForm.value.description,
       type : notification_type,
       promo_code_ids : 0
     }

     this.clinicService.editNotification(data).subscribe(
      (result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/clinic/notifications/notification-list']);
          }, 600 );
          Swal.fire(
            '',
            result.message,
            'success'
          )
        } 
      }, 
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err,
          'error'
        )
    })
  }
}
