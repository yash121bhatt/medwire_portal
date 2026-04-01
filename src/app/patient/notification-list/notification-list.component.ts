import { Component, OnInit , AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';



@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.sass']
})
export class NotificationListComponent implements OnInit {

  systemNotificationData: any = [];
  all_notifications: any = [];
  pagination2: any;
  total: any;
  

  constructor(
    private patientdataService: PatientdataService,
    private authService: AuthService
  ) {
    //Package Paginator
    for (let i = 1; i <= 100; i++) {
      this.all_notifications.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
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