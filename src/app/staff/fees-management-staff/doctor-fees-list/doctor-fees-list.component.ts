import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctor-fees-list',
  templateUrl: './doctor-fees-list.component.html',
  styleUrls: ['./doctor-fees-list.component.sass']
})
export class DoctorFeesListComponent implements OnInit {
  created_by_id: any;
  doctorfeesList: any;
  imageURL = `${environment.documentUrl}`;

  constructor(
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/staff/staff-editmyprofile"]);

    }
    else{

    }
    this.staffDetail();
  }

  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicServiceService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          // console.log(result);
          this.created_by_id = result.data[0].created_by_id;
          this.doctorFees();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doctorFees(){
    const clinicId = {
      clinic_id : this.created_by_id 
       }
  
       this.clinicServiceService.doctorFesslist(clinicId).subscribe(
        (result)=>{
          this.doctorfeesList = result.data;
           //console.log('doctorfess',result.data);
        },
        (err)=>{
         
        }
       )
  }
}
