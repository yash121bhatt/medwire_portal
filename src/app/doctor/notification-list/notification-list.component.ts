import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.sass']
})
export class NotificationListComponent implements OnInit {

  systemNotificationData : any = [];
  all_notifications      : any = [];
  pagination2            : any;
  total                  : any;
  constructor(
    private patientdataService: PatientdataService,
    private authService: AuthService,
    private router: Router
  ) {
    //Package Paginator
    for (let i = 1; i <= 100; i++) {
      this.all_notifications.push(`item ${i}`);
    }
  }

  ngOnInit(): void {

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/doctor/labeditprofile"])
    }
    else{

    }
    this.systemNotification();
  }

  systemNotification() {
    const data = {
      user_id: this.authService.currentUserValue.userid,
      role_id: this.authService.currentUserValue.roleID,
      is_get_all: 1
    }
    this.patientdataService.systemNotification(data).subscribe((res: any) => {
      
      this.systemNotificationData = res.data[0].all_notifications;

      const data ={
        "user_id": this.authService.currentUserValue.userid,
        "role_id":this.authService.currentUserValue.roleID,
  
    }
    this.patientdataService.readAllNotification(data).subscribe(
      (result)=>{
       
    },
    (err)=>{

    }
    )
    }, (error: any) => {
      console.log(error);

    })
  }

}