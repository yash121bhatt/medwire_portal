import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { environment } from "src/environments/environment";

export interface PeriodicElement {
  no: number;
  img: any;
  clinic_name: string;
  clinic_timing: string;
  status: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    img: "assets/images/user/clinic1.png",
    clinic_name: "Life Line Clinic",
    clinic_timing: "10:00 AM to 02:00 PM",
    status: "Online",
    actions: " ",
  },
  {
    no: 2,
    img: "assets/images/user/clinic2.png",
    clinic_name: "Ripple Family Clinic",
    clinic_timing: "10:00 AM to 02:00 PM",
    status: "Offline",
    actions: " ",
  },
  {
    no: 3,
    img: "assets/images/user/clinic3.png",
    clinic_name: "Doir Minar Clinic",
    clinic_timing: "10:00 AM to 02:00 PM",
    status: "Online",
    actions: " ",
  },
  
];
@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.sass']
})
export class ClinicListComponent implements OnInit {
//mat-tablle-filter
@ViewChild('empTbSort') empTbSort = new MatSort();
sort: MatSort;
urlparameter: any;
imageURL = `${environment.documentUrl}`;
ngAfterViewInit() {
  this.dataSource3.sort = this.empTbSort;
}
displayedColumns: string[] = [
  "no",
  "img",
  "full_name",
  "clinic_email",
  "clinic_timing",
  // "status",
  "actions",
];
dataSource = ELEMENT_DATA;
dataSource2 = new MatTableDataSource<PeriodicElement>();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
dataSource3 = new MatTableDataSource();

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
}

constructor(
  private authservice : AuthService,
  private doctorServiceService: DoctorServiceService,
) {

}

ngOnInit() {
  this.dataSource3.paginator = this.paginator;


  const doctorID ={
    user_id:this.authservice.currentUserValue.userid
  }

  this.doctorServiceService.clinicListData(doctorID).subscribe(
    (result)=>{
      this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
      this.dataSource3.sort = this.empTbSort;
      this.dataSource3.paginator = this.paginator;
    },
    (err)=>{

    }  
    )
}


}