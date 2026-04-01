import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.sass']
})
export class NotificationFormComponent {
  addnotificationForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  doctor = false;
  general = false;
  pincode_radio = false;
  patient_radio = false;
  isHidden = true;
  public selection: string;
  public selectiontwo: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  public variables3 = [];
  public filteredList3: any;
  public variables4 = [];
  public filteredList4: any;
  user_id: any;
  role_id: any = 8;
  patient_ids: any = "";
  doctor_id: any = 0;
  notification_for: any;
  notification_sent_by: any;
  notification_title: any;
  notification_date_time: any;
  description: any;
  patient_pin_code: any = 0;
  date_time = false;
  notification_type: any;
  currentDate: Date = new Date()
  doctorData: any;
  created_by_id: any;

  changedivthree(divid) {
    if (divid === "onTheSpot") {
      // this.pincode_radio = true;
      this.date_time = false;

    }
    else if (divid === "dateandTime") {
      // this.pincode_radio = false;
      this.date_time = true;
    }

  }

  toggle() {
    this.isHidden = !this.isHidden;
  }

  ngOnInit(): void {
    this.user_id = this.authService.currentUserValue.userid;
    // setTimeout(() => {
    //   this.doctorsList();
    // }, 1000);
    this.staffDetail();
  }

  //Staff detail api for clinic id
  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicServiceService.staffDetail(data).subscribe(
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

  changediv(divid) {
    if (divid === "doctor_visit") {
      this.doctor = true;
      this.general = true;
      let data = {
        clinic_id: this.created_by_id
      }
      this.clinicServiceService.doctorList(data).subscribe((result) => {
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
        user_id: this.created_by_id,
        role_id: this.role_id
      }
      this.clinicService.getPatient(data).subscribe((result) => {
        this.variables4 = result.data;
        this.filteredList4 = this.variables4.slice();
      });
    }

  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clinicService: ClinicServiceService,
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
  ) {
    this.addnotificationForm = this.fb.group
      ({
        notification_for: ["", [Validators.required]],
        doctor_id: [""],
        notification_sent_by: ["", [Validators.required]],
        patient_pin_code: [""],
        patient_ids: [""],
        notification_date_time: [""],
        notification_title: ["", [Validators.required]],
        description: ["", [Validators.required]],
        notification_type: ["", [Validators.required]]
      });
  }
  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;
  

  // doctorsList() {
  //   const doctorList = {
  //     "clinic_id": this.created_by_id
  //   }

  //   this.clinicServiceService.doctorList(doctorList).subscribe(
  //     (result) => {
  //       this.doctorData = result.data;
  //       console.log('all docotor', result);

  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  
  onSubmit() {
    this.submitted = true;
    let notification_date_time;
    let notification_type;
    if (this.addnotificationForm.value.notification_sent_by == "pin_code") {
      this.patient_pin_code = this.addnotificationForm.value.patient_pin_code
    }
    if (this.addnotificationForm.value.notification_sent_by == "patient") {
      this.patient_ids = this.addnotificationForm.value.patient_ids
    }
    if (this.addnotificationForm.value.notification_for == "doctor") {
      this.doctor_id = this.addnotificationForm.value.doctor_id
    }
    if (this.addnotificationForm.value.notification_type == "on_spot") {
      notification_date_time = new Date();
      notification_type = 1;
    }
    if (this.addnotificationForm.value.notification_type == "date_time") {
      notification_date_time = this.addnotificationForm.value.notification_date_time
      notification_type = 2;
    }
    let data = {
      staff_id: this.user_id,
      role_id: this.role_id,
      user_id: this.created_by_id,
      doctor_id: this.doctor_id,
      notification_for: this.addnotificationForm.value.notification_for,
      notification_sent_by: this.addnotificationForm.value.notification_sent_by,
      patient_pin_code: this.patient_pin_code,
      patient_ids: this.patient_ids.toString(),
      notification_title: this.addnotificationForm.value.notification_title,
      notification_date_time: notification_date_time,
      description: this.addnotificationForm.value.description,
      type: notification_type,
      promo_code_ids: 0
    }

    this.clinicService.addNotification(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/staff/notifications/notification-list']);
          }, 600);
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

