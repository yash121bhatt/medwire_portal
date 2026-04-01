import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

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

  constructor(
    private authService  : AuthService,
    private clinicServiceService : ClinicServiceService,
    private router : Router
  ) { 

  }

  ngOnInit(): void {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
       this.router.navigate(["/clinic/clinic-editmyprofile"]);

    }
    else{

    }

   this.getclinicDashCount();
   
  }
  getclinicDashCount()
  {
   const clinicID = {
    clinic_id : this.authService.currentUserValue.userid  
   }

   this.clinicServiceService.getclinicdashCount(clinicID).subscribe(
    (result)=>{
      this.completed_apppintment = result.data[0].completed_apppintment;
      this.todays_apppintment    = result.data[0].todays_apppintment;
      this.todays_patient        = result.data[0].todays_patient;
      this.total_apppintment     = result.data[0].total_apppintment;
      this.total_patient         = result.data[0].total_patient;
    },
    (err)=>{

    }
   );

  }

}