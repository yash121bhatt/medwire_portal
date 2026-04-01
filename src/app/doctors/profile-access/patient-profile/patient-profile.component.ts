import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.sass']
})
export class PatientProfileComponent implements OnInit {
  request_id: string;
  loadcalendartrue: boolean =false;

  constructor(
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private doctorServiceService : DoctorServiceService
  ) {

   }

  ngOnInit(): void {
    this.request_id = this.activatedRoute.snapshot.paramMap.get('request_id');
    setTimeout(() => { 
      this.loadcalendartrue= true;
    }, 1000);
  }

}
