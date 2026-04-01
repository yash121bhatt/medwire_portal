import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lab-test-detail',
  templateUrl: './lab-test-detail.component.html',
  styleUrls: ['./lab-test-detail.component.sass']
})
export class LabTestDetailComponent implements OnInit {

  maxDate = new Date();
  bookingForm: FormGroup;
  hide3 = true;
  agree3 = false;
  user_id: any;
  token: any;
  memberID: string;

  constructor(
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute
    ) {
    this.bookingForm = this.fb.group({
      name: ["", [Validators.required,]],
      
      date_time: ["", [Validators.required , Number]],
    });
  }
  ngOnInit(): void {
    this.memberID = this.route.snapshot.paramMap.get('type');
  }

  onSubmit(_data:any) {
    
    const labData = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "name": this.bookingForm.value.name,
      "date_time": this.bookingForm.value.date_time,
      "type": "lab_test",
    }

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    this.patientServiceService.addlabTest(labData).subscribe(
      (result) => {
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/patient/notifications/lab-test/'+this.route.snapshot.paramMap.get('type')]);
          }, 500);

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

}