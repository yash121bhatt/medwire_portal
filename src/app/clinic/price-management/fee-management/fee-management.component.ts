import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';


@Component({
  selector: 'app-fee-management',
  templateUrl: './fee-management.component.html',
  styleUrls: ['./fee-management.component.sass']
})


export class FeeManagementComponent implements OnInit {
  doctorfeesList: any;
  imageURL = `${environment.documentUrl}`;

  constructor(
    private authService:AuthService,
    private clinicServiceService : ClinicServiceService,
    private router : Router
  ) { }

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


   const clinicId = {
    clinic_id : this.authService.currentUserValue.userid
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
