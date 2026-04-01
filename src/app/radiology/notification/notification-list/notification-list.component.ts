import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { PatientServiceService } from "src/app/services/patient-service.service";
import { AuthService } from "src/app/core/service/auth.service";
import * as moment from 'moment';
import Swal from "sweetalert2";
import { ModalDismissReasons , NgbModal } from "@ng-bootstrap/ng-bootstrap";

// import 'moment/locale/pt-br';
export interface PeriodicElement {
  notification_sent_by: number;
  notification_for: string;
  notification_title:string;
  notification_date_time: string;
  description: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.sass']
})
export class NotificationListComponent implements OnInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  moment: any = moment;
  urlparameter: any;
  user_id :any;
  role_id : any = 4;
  deleteId : any;
  closeResult: string;
  error_message:boolean = false;
  error_message_text:string;
  currentDate : Date = new Date();
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "notification_for",
    "notification_sent_by",
    "notification_title",
    "notification_date_time",
    "description",
    "actions"
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(private patientService : PatientServiceService , private authService:AuthService ,  private modalService: NgbModal) {}
  ngOnInit() {
    this.user_id = this.authService.currentUserValue.userid;
    this.fetch();
  }

  fetch(){
    let data = {
      user_id : this.user_id,
      role_id : this.role_id
    }
    this.patientService.notificationList(data).subscribe((result)=>{
      let data = result.data;
      this.dataSource3 = new MatTableDataSource(data);
      this.dataSource3.paginator = this.paginator; 
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getdeleteID(Id){
    this.deleteId= Id;
  }

  compareDate(currentDate,date,type){
    let date1 = new Date(currentDate);
    let date2 = new Date(date);
    if(type == 1){
      if (date1.getTime() < date2.getTime())
      return true;
      return false
    }
    if(type == 2){
      if (date1.getTime() > date2.getTime())
      return true;
      return false
    }
}

  deleteRecord(){
    const data = { 
      notification_id : this.deleteId
    };
   this.patientService.deleteNotification(data).subscribe(
    (result)=>{
      setTimeout(()=> {
        this.fetch();
      }, 300 );
      Swal.fire(
        '',
        result.message,
        'success'
      )
    },
    (err)=>{
      this.error_message= true;
      this.error_message_text=err;
      Swal.fire(
        '',
        err.message,
        'error'
      )
    }
   );
  }

}