import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { max } from 'moment';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';

// import * as moment from 'moment';
// import * as moment from 'moment';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.sass']
})
export class AvailabilityComponent implements OnInit {
  maxDate:Date = new Date();
  calendarOptions = {isFromNow : true};
  morningSlot:any;
  afternoonSlot:any;
  eveningSlot:any;
  scheduleForm: FormGroup;
  full: boolean = false;
  morning: boolean = false;
  afternoon: boolean = false;
  evening: boolean = false;
  // calendarOptions = {};
  calendarEvents = [new Date()];
  calendarValue = new Date();
  myCalenderValue :any = new Date(this.calendarValue).toDateString();
  submitted: boolean;
  days_status:any;
  morningSlot1:boolean = false;
  afternoonSlot1:boolean = false;
  eveningSlot1:boolean = false;
  morning_shift_status:any;
  afternoon_shift_status:any;
  evening_shift_status:any;
  @Input() doctor_id = "";
  constructor(
    private fb: FormBuilder ,
     private clinicService:ClinicServiceService , 
     private router : Router,
     private authService : AuthService
     ) {
    this.scheduleForm = this.fb.group
    ({
      calender: [""],
      full: [""],
      morning: [""],
      afternoon: [""],
      evening: [""],
    });
   }

  ngOnInit(): void {
    this.fetch();
  }

  toggleChange(e){
     if(e.checked == true){
      this.morning = false;
      this.afternoon= false;
      this.evening = false;
     }
  }
  fetch(){
    let data = {
       doctor_id : this.doctor_id,
       clinic_id : this.authService.currentUserValue.userid,
       date : this.myCalenderValue
    }
    this.clinicService.viewDoctorAvailability(data).subscribe((result) => {
      if(result.status_code == 200){
            this.morningSlot = result.result.morningSlots;
            this.afternoonSlot = result.result.afternoonSlots;
            this.eveningSlot = result.result.eveningSlots;
            this.morningSlot1 = false;
            this.afternoonSlot1 = false;
            this.eveningSlot1 = false;
            if(this.morningSlot.length == 0){
              this.morning = true;
              this.morningSlot1 = true;
            }
            if(this.afternoonSlot.length == 0){
              this.afternoon = true;
              this.afternoonSlot1 = true;
            }
            if(this.eveningSlot.length == 0){
              this.evening = true;
              this.eveningSlot1 = true;
            }
            if(this.morningSlot.length == 0 && this.afternoonSlot.length == 0 && this.eveningSlot.length == 0){
              this.full = true;
            }
        if(result.result.availability.length> 0){
          let resultData = result.result.availability[0];
          if(resultData.days_status == "0"){
                this.full = false;
          }else if(resultData.days_status == "1"){
                this.full = true;
          }
          if(resultData.morning_shift_status == "0"){
                this.morning = false;
          }else if(resultData.morning_shift_status == "1"){
                this.morning = true;
          }
          if(resultData.afternoon_shift_status == "0"){
                this.afternoon = false;
          }else if(resultData.afternoon_shift_status == "1"){
                this.afternoon = true;
          }
          if(resultData.evening_shift_status == "0"){
                this.evening = false;
          }else if(resultData.evening_shift_status == "1"){
                this.evening = true;
          }
        }else{  
        this.full = false;
        this.morning = false;
        this.afternoon = false;
        this.evening = false;
        if(this.morningSlot.length == 0){
          this.morning = true;
        }
        if(this.afternoonSlot.length == 0){
          this.afternoon = true;
        }
        if(this.eveningSlot.length == 0){
          this.evening = true;
        }
        if(this.morningSlot.length == 0 && this.afternoonSlot.length == 0 && this.eveningSlot.length == 0){
          this.full = true;
        }
      }
  }})
}
  onSubmit(){
    this.submitted = true;
    if(this.scheduleForm.value.full == false){
       this.days_status = "0";
    }else if(this.scheduleForm.value.full == true){
      this.days_status = "1";
      this.morning_shift_status = "0";
      this.afternoon_shift_status = "0";
      this.evening_shift_status = "0";
      this.scheduleForm.value.morning = false;
      this.scheduleForm.value.afternoon= false;
      this.scheduleForm.value.evening = false;
    }
    if(this.scheduleForm.value.morning == false){
      this.morning_shift_status = "0";
    }else if(this.scheduleForm.value.morning == true){
     this.morning_shift_status = "1";
    }
    if(this.scheduleForm.value.afternoon == false){
      this.afternoon_shift_status = "0";
    }else if(this.scheduleForm.value.afternoon == true){
     this.afternoon_shift_status = "1";
    }
    if(this.scheduleForm.value.evening == false){
      this.evening_shift_status = "0";
    }else if(this.scheduleForm.value.evening == true){
     this.evening_shift_status = "1";
    }
      const data = {
        doctor_id : this.doctor_id,
        clinic_id: this.authService.currentUserValue.userid,
        date : this.myCalenderValue,
        days_status : this.days_status,
        morning_shift_status :  this.morning_shift_status,
        afternoon_shift_status :  this.afternoon_shift_status,
        evening_shift_status :  this.evening_shift_status
      }
      this.clinicService.addDoctorAvailability(data).subscribe((result) => {
        Swal.fire(
          '',
          result.message,
          'success'
        )
        if(result.status_code == 200){
            this.router.navigate(["/clinic/booking-schedule/doctor-list"]);
        }
        },
        (err) => {
          Swal.fire(
            '',
            err,
            'error'
          )
        })
  } 

  onChooseDate(date: any) {
    this.calendarValue = date._d;
    // console.log(this.calendarValue);
    this.myCalenderValue = new Date(this.calendarValue).toDateString();
    this.fetch();
}
}