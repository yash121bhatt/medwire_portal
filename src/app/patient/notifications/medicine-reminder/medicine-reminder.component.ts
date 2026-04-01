import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine-reminder',
  templateUrl: './medicine-reminder.component.html',
  styleUrls: ['./medicine-reminder.component.sass']
})

export class MedicineReminderComponent implements OnInit {
  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  patientForm: any;
  fb: any;
  // eventEditForm: FormGroup;
  selectedStatus: number;
  HFormGroup3: FormGroup;
  onceDay    = true;
  twiceDay   = false;
  thriceDay  = false;
  fourthDay  = false;
  option3    = false;

  onceDay_slot   = true;
  twiceDay_slot  = false;
  thriceDay_slot = false;
  fourthDay_slot = false;

  user_id: any;
  token: any;
  memberID: string;
  asNeededSelected :Boolean = false;


  ngOnInit() {
    this.memberID =this.route.snapshot.paramMap.get('type');
    
    this.HFormGroup1 = this._formBuilder.group({
      medicine_name: ["", Validators.required],
     // medicine_type: ["", Validators.required],
     // quantity: ["", Validators.required],
    });
    this.HFormGroup2 = this._formBuilder.group({
      frequency: ["", Validators.required],
    });
    this.HFormGroup3 = this._formBuilder.group({
      take_time_one: ["", Validators.required],
      take_dose_one: ["", Validators.required],
      take_time_two: ["", Validators.required],
      take_dose_two: ["", Validators.required],
      take_time_third: ["", Validators.required],
      take_dose_third: ["", Validators.required],
      take_time_fourth: ["", Validators.required],
      take_dose_fourth: ["", Validators.required],
      
    });


    this.HFormGroup2 = new FormGroup({
      'frequency': new FormControl()
    });
    this.selectedStatus = 1;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute,
  ) {
 
  }
  
  onSubmit(_data:any) {
    var take_time_one;
    var take_time_two ; 
    var take_time_three;
    var take_time_fourth;
    if(this.HFormGroup3.value.take_time_one.length==7){
      take_time_one = '0'+this.HFormGroup3.value.take_time_one;
    }
    else{
      take_time_one = this.HFormGroup3.value.take_time_one;
    }

    if(this.HFormGroup3.value.take_time_two.length==7){
      take_time_two = '0'+this.HFormGroup3.value.take_time_two;
    }
    else{
      take_time_two = this.HFormGroup3.value.take_time_two;
    }

    if(this.HFormGroup3.value.take_time_third.length==7){
      take_time_three = '0'+this.HFormGroup3.value.take_time_third;
    }
    else{
      take_time_three = this.HFormGroup3.value.take_time_third;
    }

    if(this.HFormGroup3.value.take_time_fourth.length==7){
      take_time_fourth = '0'+this.HFormGroup3.value.take_time_fourth;
    }
    else{
      take_time_fourth = this.HFormGroup3.value.take_time_fourth;
    }


    const notificationData = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "medicine_name": this.HFormGroup1.value.medicine_name,
     // "medicine_type": this.HFormGroup1.value.medicine_type,
     // "quantity": this.HFormGroup1.value.quantity,
      "frequency": this.HFormGroup2.value.frequency,
      "take_time_one": take_time_one??'-',
      "take_dose_one": this.HFormGroup3.value.take_dose_one??'-',
      "take_time_two": take_time_two??'-',
      "take_dose_two": this.HFormGroup3.value.take_dose_two??'-',
      "take_time_third": take_time_three??'-',
      "take_dose_third": this.HFormGroup3.value.take_dose_third??'-',
      "take_time_fourth":take_time_fourth??'-',
      "take_dose_fourth": this.HFormGroup3.value.take_dose_fourth??'-',

    }

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    this.patientServiceService.addPreMedicine(notificationData).subscribe(
      (result) => {
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/patient/notifications/medicine-notification/'+this.route.snapshot.paramMap.get('type')]);
          }, 2000);

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
          err.message,
          'error'
        )
      });
  }

  changediv(divid) {
    if (divid === "cc_onceDaily") {
      this.onceDay = true;
      this.twiceDay = false;
      this.thriceDay = false;
      this.fourthDay = false;

      this.onceDay_slot   = true;
      this.twiceDay_slot  = false;
      this.thriceDay_slot = false;
      this.fourthDay_slot = false;
      
    }
    else if (divid === "nc_twiceDaily") {
      this.onceDay   = false;
      this.twiceDay  = true;
      this.thriceDay = false;
      this.fourthDay = false;
      this.option3   = false;

      this.onceDay_slot   = false;
      this.twiceDay_slot  = true;
      this.thriceDay_slot = false;
      this.fourthDay_slot = false;
    }
    else if (divid === "cc_thriceDaily") {
      this.onceDay   = false;
      this.twiceDay  = false;
      this.thriceDay = true;
      this.fourthDay = false;
      this.option3   = false;

      this.onceDay_slot   = false;
      this.twiceDay_slot  = false;
      this.thriceDay_slot = true;
      this.fourthDay_slot = false;
    }
    else if (divid === "cc_fourthDaily") {
      this.onceDay   = false;
      this.twiceDay  = false;
      this.thriceDay = false;
      this.fourthDay = true;
      this.option3   = false;

      this.onceDay_slot   = false;
      this.twiceDay_slot  = false;
      this.thriceDay_slot = false;
      this.fourthDay_slot = true;
    }
    else if (divid === "cc_asPerNeed") {
      this.onceDay   = false;
      this.twiceDay  = false;
      this.thriceDay = false;
      this.fourthDay = false;
      this.option3   =  true;
      this.asNeededSelected = true;
      this.onceDay_slot   = false;
      this.twiceDay_slot  = false;
      this.thriceDay_slot = false;
      this.fourthDay_slot = false;
    }

  }
}
