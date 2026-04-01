import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prescription-tabs',
  templateUrl: './prescription-tabs.component.html',
  styleUrls: ['./prescription-tabs.component.sass']
})
export class PrescriptionTabsComponent implements OnInit {

  loading : boolean = false;
  cancelbtnClientId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorServiceService : DoctorServiceService
  ) { 

  }

  tabIndex : number= 0;

  ngOnInit(): void {
    this.cancelbtnClientId = JSON.parse(localStorage.getItem('clientData')).clientChoose;
    // console.log('get apid ',localStorage.getItem('appointmentID'))
   // this.route.snapshot.paramMap.get('type')
  if(this.route.snapshot.paramMap.get('type')=='0' || this.route.snapshot.paramMap.get('type')==''){
    this.tabIndex= 0;
  }
  else if(this.route.snapshot.paramMap.get('type')=='1'){
    this.tabIndex= 1;
  }
  else if(this.route.snapshot.paramMap.get('type')=='2'){
      this.tabIndex= 2;
    }
  else if(this.route.snapshot.paramMap.get('type')=='3'){
      this.tabIndex= 3;
    }
  else if(this.route.snapshot.paramMap.get('type')=='4'){
      this.tabIndex= 4;
    }
  else if(this.route.snapshot.paramMap.get('type')=='5'){
      this.tabIndex= 5;
    }
  else if(this.route.snapshot.paramMap.get('type')=='6'){
      this.tabIndex= 6;
    }
  else if(this.route.snapshot.paramMap.get('type')=='7'){
      this.tabIndex= 7;
    }
  else{

    }


    
  }

  //Dashboard Dyanamic Code 
  public testCall(tabname) {
    // console.log('value = ', tabname);
    this.tabIndex=tabname;
    this.ngOnInit();


    setTimeout(() => {
      this.tabIndex=1;
      alert(' I am From Prescription Tab'+tabname);
     // (<HTMLElement>document.querySelectorAll('.mat-tab-label').tabname).click();
    }, 200);

  }

  moveToSelectedTab(tabName: string) {
    for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
    }

    finalSubmitReport(){
       
       const data ={
        "appointment_id":this.route.snapshot.paramMap.get('appointment_id')
      }
     this.loading  = true;
      this.doctorServiceService.finalSubmitPrescription(data).subscribe(
        (result)=>{
          this.loading  = false;
          Swal.fire(
            '',
            result.message,
            'success'
          )
         
          window.open(result.pdf_url, "_blank");
          this.router.navigate(['/doctors/appointments/appointment-list/'+this.cancelbtnClientId]);
          
        },
        (err)=>{
          this.loading  = false;
          Swal.fire(
            '',
            err,
            'error'
          )
        }
      );

    }

}