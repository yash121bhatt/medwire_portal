import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.sass']
})
export class WeeklyScheduleComponent {
  @Input() doctor_id = "";

  scheduleForm: FormGroup;
  submitted = false;
  monday: Boolean = false;
  tuesday: Boolean = false;
  wednesday: Boolean = false;
  thursday: Boolean = false;
  friday: Boolean = false;
  saturday: Boolean = false;
  sunday: Boolean = false;
  returnUrl: Boolean = false;
  mondayStatus: any;
  tuesdayStatus: any;
  wednesdayStatus: any;
  thursdayStatus: any;
  fridayStatus: any;
  saturdayStatus: any;
  sundayStatus: any;
  start_time_mon_mor: any;
  end_time_mon_mor: any;
  start_time_mon_an: any;
  end_time_mon_an: any;
  start_time_mon_evn: any;
  end_time_mon_evn: any;

  start_time_tus_mor: any;
  end_time_tus_mor: any;
  start_time_tus_an: any;
  end_time_tus_an: any;
  start_time_tus_evn: any;
  end_time_tus_evn: any;

  start_time_wed_mor: any;
  end_time_wed_mor: any;
  start_time_wed_an: any;
  end_time_wed_an: any;
  start_time_wed_evn: any;
  end_time_wed_evn: any;

  start_time_thur_mor: any;
  end_time_thur_mor: any;
  start_time_thur_an: any;
  end_time_thur_an: any;
  start_time_thur_evn: any;
  end_time_thur_evn: any;

  start_time_fri_mor: any;
  end_time_fri_mor: any;
  start_time_fri_an: any;
  end_time_fri_an: any;
  start_time_fri_evn: any;
  end_time_fri_evn: any;

  start_time_sat_mor: any;
  end_time_sat_mor: any;
  start_time_sat_an: any;
  end_time_sat_an: any;
  start_time_sat_evn: any;
  end_time_sat_evn: any;

  start_time_sun_mor: any;
  end_time_sun_mor: any;
  start_time_sun_an: any;
  end_time_sun_an: any;
  start_time_sun_evn: any;
  end_time_sun_evn: any;
  created_by_id: any;
  ngOnInit() {
    setTimeout(() => {
      this.fetch();
    }, 1000);
    this.staffDetail();
  }

  //Staff detail api for clinic id
  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          // console.log(result);
          this.created_by_id = result.data[0].created_by_id;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  constructor(private fb: FormBuilder, private clinicService: ClinicServiceService, private authService: AuthService, private router: Router) {
    this.scheduleForm = this.fb.group({
      monday: [""],
      tuesday: [""],
      wednesday: [""],
      thursday: [""],
      friday: [""],
      saturday: [""],
      sunday: [""],

      start_time_mon_mor: [""],
      end_time_mon_mor: [""],
      start_time_mon_an: [""],
      end_time_mon_an: [""],
      start_time_mon_evn: [""],
      end_time_mon_evn: [""],

      start_time_tus_mor: [""],
      end_time_tus_mor: [""],
      start_time_tus_an: [""],
      end_time_tus_an: [""],
      start_time_tus_evn: [""],
      end_time_tus_evn: [""],

      start_time_wed_mor: [""],
      end_time_wed_mor: [""],
      start_time_wed_an: [""],
      end_time_wed_an: [""],
      start_time_wed_evn: [""],
      end_time_wed_evn: [""],

      start_time_thur_mor: [""],
      end_time_thur_mor: [""],
      start_time_thur_an: [""],
      end_time_thur_an: [""],
      start_time_thur_evn: [""],
      end_time_thur_evn: [""],

      start_time_fri_mor: [""],
      end_time_fri_mor: [""],
      start_time_fri_an: [""],
      end_time_fri_an: [""],
      start_time_fri_evn: [""],
      end_time_fri_evn: [""],

      start_time_sat_mor: [""],
      end_time_sat_mor: [""],
      start_time_sat_an: [""],
      end_time_sat_an: [""],
      start_time_sat_evn: [""],
      end_time_sat_evn: [""],

      start_time_sun_mor: [""],
      end_time_sun_mor: [""],
      start_time_sun_an: [""],
      end_time_sun_an: [""],
      start_time_sun_evn: [""],
      end_time_sun_evn: [""],
    });

  }
  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;

  fetch() {
    let data = {
      doctor_id: this.doctor_id,
      clinic_id: this.created_by_id,
    }
    this.clinicService.viewDoctorWeeklySchedule(data).subscribe((result) => {
      if (result.status_code == 200) {
        let data = result.result;
        if (data[0].status == "1") {
          this.monday = true
        } else
          if (data[0].status == "0") {
            this.monday = false
          }
        if (data[1].status == "1") {
          this.tuesday = true
        } else
          if (data[1].status == "0") {
            this.tuesday = false
          }
        if (data[2].status == "1") {
          this.wednesday = true
        } else
          if (data[2].status == "0") {
            this.wednesday = false
          }
        if (data[3].status == "1") {
          this.thursday = true
        } else
          if (data[3].status == "0") {
            this.thursday = false
          }
        if (data[4].status == "1") {
          this.friday = true
        } else
          if (data[4].status == "0") {
            this.friday = false
          }
        if (data[5].status == "1") {
          this.saturday = true
        } else
          if (data[5].status == "0") {
            this.saturday = false
          }
        if (data[6].status == "1") {
          this.sunday = true
        } else
          if (data[6].status == "0") {
            this.sunday = false
          }
        this.start_time_mon_mor = data[0].morning_shift_start
        this.end_time_mon_mor = data[0].morning_shift_end
        this.start_time_mon_an = data[0].afternoon_shift_start
        this.end_time_mon_an = data[0].afternoon_shift_end
        this.start_time_mon_evn = data[0].evening_shift_start
        this.end_time_mon_evn = data[0].evening_shift_end

        this.start_time_tus_mor = data[1].morning_shift_start
        this.end_time_tus_mor = data[1].morning_shift_end
        this.start_time_tus_an = data[1].afternoon_shift_start
        this.end_time_tus_an = data[1].afternoon_shift_end
        this.start_time_tus_evn = data[1].evening_shift_start
        this.end_time_tus_evn = data[1].evening_shift_end

        this.start_time_wed_mor = data[2].morning_shift_start
        this.end_time_wed_mor = data[2].morning_shift_end
        this.start_time_wed_an = data[2].afternoon_shift_start
        this.end_time_wed_an = data[2].afternoon_shift_end
        this.start_time_wed_evn = data[2].evening_shift_start
        this.end_time_wed_evn = data[2].evening_shift_end

        this.start_time_thur_mor = data[3].morning_shift_start
        this.end_time_thur_mor = data[3].morning_shift_end
        this.start_time_thur_an = data[3].afternoon_shift_start
        this.end_time_thur_an = data[3].afternoon_shift_end
        this.start_time_thur_evn = data[3].evening_shift_start
        this.end_time_thur_evn = data[3].evening_shift_end

        this.start_time_fri_mor = data[4].morning_shift_start
        this.end_time_fri_mor = data[4].morning_shift_end
        this.start_time_fri_an = data[4].afternoon_shift_start
        this.end_time_fri_an = data[4].afternoon_shift_end
        this.start_time_fri_evn = data[4].evening_shift_start
        this.end_time_fri_evn = data[4].evening_shift_end

        this.start_time_sat_mor = data[5].morning_shift_start
        this.end_time_sat_mor = data[5].morning_shift_end
        this.start_time_sat_an = data[5].afternoon_shift_start
        this.end_time_sat_an = data[5].afternoon_shift_end
        this.start_time_sat_evn = data[5].evening_shift_start
        this.end_time_sat_evn = data[5].evening_shift_end

        this.start_time_sun_mor = data[6].morning_shift_start
        this.end_time_sun_mor = data[6].morning_shift_end
        this.start_time_sun_an = data[6].afternoon_shift_start
        this.end_time_sun_an = data[6].afternoon_shift_end
        this.start_time_sun_evn = data[6].evening_shift_start
        this.end_time_sun_evn = data[6].evening_shift_end

      }
    })
  }

  convertDateToTime(dateObj) {
    const date = new Date(dateObj);
    let time: any = date.getHours() + ":" + date.getMinutes()
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? 'AM' : 'PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join(''); // return adjusted time or original string
  }


  onSubmit() {
    // this.scheduleForm.value.end_time_mon_evn = this.convertDateToTime(this.scheduleForm.value.end_time_mon_evn); 
    // console.log(this.scheduleForm.value.end_time_mon_evn);
    this.submitted = true;
    // console.log("Form Value", this.scheduleForm.value);
    if (this.scheduleForm.value.monday == true) {
      this.mondayStatus = "1"
    } else if (this.scheduleForm.value.monday == false) {
      this.mondayStatus = "0"
    }
    if (this.scheduleForm.value.tuesday == true) {
      this.tuesdayStatus = "1"
    } else if (this.scheduleForm.value.tuesday == false) {
      this.tuesdayStatus = "0"
    }
    if (this.scheduleForm.value.wednesday == true) {
      this.wednesdayStatus = "1"
    } else if (this.scheduleForm.value.wednesday == false) {
      this.wednesdayStatus = "0"
    }
    if (this.scheduleForm.value.thursday == true) {
      this.thursdayStatus = "1"
    } else if (this.scheduleForm.value.thursday == false) {
      this.thursdayStatus = "0"
    }
    if (this.scheduleForm.value.friday == true) {
      this.fridayStatus = "1"
    } else if (this.scheduleForm.value.friday == false) {
      this.fridayStatus = "0"
    }
    if (this.scheduleForm.value.saturday == true) {
      this.saturdayStatus = "1"
    } else if (this.scheduleForm.value.saturday == false) {
      this.saturdayStatus = "0"
    }
    if (this.scheduleForm.value.sunday == true) {
      this.sundayStatus = "1"
    } else if (this.scheduleForm.value.sunday == false) {
      this.sundayStatus = "0"
    }
    let data = {
      doctor_id: this.doctor_id,
      clinic_id: this.created_by_id,
      daysData: [
        {
          days: "Monday",
          morning_shift_start: this.scheduleForm.value.start_time_mon_mor,
          morning_shift_end: this.scheduleForm.value.end_time_mon_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_mon_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_mon_an,
          evening_shift_start: this.scheduleForm.value.start_time_mon_evn,
          evening_shift_end: this.scheduleForm.value.end_time_mon_evn,
          status: this.mondayStatus
        },
        {
          days: "Tuesday",
          morning_shift_start: this.scheduleForm.value.start_time_tus_mor,
          morning_shift_end: this.scheduleForm.value.end_time_tus_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_tus_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_tus_an,
          evening_shift_start: this.scheduleForm.value.start_time_tus_evn,
          evening_shift_end: this.scheduleForm.value.end_time_tus_evn,
          status: this.tuesdayStatus
        },
        {
          days: "Wednesday",
          morning_shift_start: this.scheduleForm.value.start_time_wed_mor,
          morning_shift_end: this.scheduleForm.value.end_time_wed_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_wed_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_wed_an,
          evening_shift_start: this.scheduleForm.value.start_time_wed_evn,
          evening_shift_end: this.scheduleForm.value.end_time_wed_evn,
          status: this.wednesdayStatus
        },
        {
          days: "Thursday",
          morning_shift_start: this.scheduleForm.value.start_time_thur_mor,
          morning_shift_end: this.scheduleForm.value.end_time_thur_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_thur_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_thur_an,
          evening_shift_start: this.scheduleForm.value.start_time_thur_evn,
          evening_shift_end: this.scheduleForm.value.end_time_thur_evn,
          status: this.thursdayStatus
        },
        {
          days: "Friday",
          morning_shift_start: this.scheduleForm.value.start_time_fri_mor,
          morning_shift_end: this.scheduleForm.value.end_time_fri_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_fri_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_fri_an,
          evening_shift_start: this.scheduleForm.value.start_time_fri_evn,
          evening_shift_end: this.scheduleForm.value.end_time_fri_evn,
          status: this.fridayStatus
        },
        {
          days: "Saturday",
          morning_shift_start: this.scheduleForm.value.start_time_sat_mor,
          morning_shift_end: this.scheduleForm.value.end_time_sat_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_sat_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_sat_an,
          evening_shift_start: this.scheduleForm.value.start_time_sat_evn,
          evening_shift_end: this.scheduleForm.value.end_time_sat_evn,
          status: this.saturdayStatus
        },
        {
          days: "Sunday",
          morning_shift_start: this.scheduleForm.value.start_time_sun_mor,
          morning_shift_end: this.scheduleForm.value.end_time_sun_mor,
          afternoon_shift_start: this.scheduleForm.value.start_time_sun_an,
          afternoon_shift_end: this.scheduleForm.value.end_time_sun_an,
          evening_shift_start: this.scheduleForm.value.start_time_sun_evn,
          evening_shift_end: this.scheduleForm.value.end_time_sun_evn,
          status: this.sundayStatus
        }
      ]
    }
    this.clinicService.addDoctorWeeklySchedule(data).subscribe((result) => {
      Swal.fire(
        '',
        "Doctor's Schedule Added Successfully",
        'success'
      )
      if (result.status_code == 200) {
        this.router.navigate(["/staff/booking-schedule/doctor-list"]);
      }
    },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
      }
    );

  }

}
