import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { AuthService } from "src/app/core/service/auth.service";
import { ClinicServiceService } from "src/app/services/clinic-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  completed_apppintment: any;
  todays_apppintment: any;
  todays_patient: any;
  total_apppintment: any;
  total_patient: any;
  created_by_id: any;

  constructor(
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
    private clinicService: ClinicServiceService,
  ) {

  }

  ngOnInit(): void {

    // this.getclinicDashCount();

    this.staffDetail();

    setTimeout(() => {
      this.getclinicDashCount();
    }, 1000);

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

  getclinicDashCount() {
    const clinicID = {
      clinic_id: this.created_by_id,
    }

    this.clinicServiceService.getclinicdashCount(clinicID).subscribe(
      (result) => {
        this.completed_apppintment = result.data[0].completed_apppintment;
        this.todays_apppintment = result.data[0].todays_apppintment;
        this.todays_patient = result.data[0].todays_patient;
        this.total_apppintment = result.data[0].total_apppintment;
        this.total_patient = result.data[0].total_patient;
        
      },
      (err) => {

      }
    );

  }
}
