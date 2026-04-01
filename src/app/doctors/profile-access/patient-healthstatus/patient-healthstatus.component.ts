import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import Swal from "sweetalert2";


export interface PeriodicElement {
  s_no: string;
  heart_rate: string;
  upload_date_time: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    s_no: "1",
    heart_rate: "78 beats/min",
    upload_date_time: "01/11/2021 07:27:07",
  },
  {
    s_no: "2",
    heart_rate: "78 beats/min",
    upload_date_time: "02/01/2023 04:30:00",
  },
  {
    s_no: "3",
    heart_rate: "77 beats/min",
    upload_date_time: "01/01/2023 01:17:01"
  },
  
];
@Component({
  selector: 'app-patient-healthstatus',
  templateUrl: './patient-healthstatus.component.html',
  styleUrls: ['./patient-healthstatus.component.sass']
})
export class PatientHealthstatusComponent implements OnInit {
//mat-tablle-filter
@ViewChild('empTbSort') empTbSort = new MatSort();
sort: MatSort;
urlparameter: any;
healthTypeName: any;
  healthType: string;

ngAfterViewInit() {
  this.dataSource3.sort = this.empTbSort;
}
showTitleErorIcon() {
  Swal.fire({
    icon: "success",
    text: "Your Request has been sent to your patient.",
  });
}
displayedColumns: string[] = [
  "s_no",
  "heart_rate",
  "createdate",
];
dataSource = ELEMENT_DATA;
dataSource2 = new MatTableDataSource<PeriodicElement>(
  
);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
dataSource3 = new MatTableDataSource();
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
}

@Input() requestID: any;


constructor(
  private authService : AuthService,
  private doctorServiceService : DoctorServiceService
) {}


ngOnInit() {

  this.dataSource3.paginator = this.paginator;
  this.getHealthResult('heart_rate');
  this.healthTypeName = 'Heart Rate';
  this.healthType     = 'heart_rate';
}

getHealthResult(type:any){
  this.healthType = type;
  
const data ={
  "requestId":this.requestID,
  "filtertype" : type
}
this.doctorServiceService.getHealthResult(data).subscribe(
  (result)=>{
    this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
    this.dataSource3.sort = this.empTbSort;
    this.dataSource3.paginator = this.paginator;
},
(err)=>{

}
)
}

healthResult(element:any){
if(this.healthType ==='heart_rate'){
  this.healthTypeName = 'Heart Rate';
  return element.heart_rate+' beats/min';
}
else if(this.healthType ==='blood_pressure'){
  this.healthTypeName = 'Blood Pressure';
  return element.blood_pressure+' mmHg';  
}
else if(this.healthType ==='respiratory_rate'){
  this.healthTypeName = 'Respiratory Rate';
  return element.respiratory_rate+' breaths/min';  
}
else if(this.healthType ==='oxygen_saturation'){
  this.healthTypeName = 'Oxygen Saturation';
  return element.oxygen_saturation+' %';  
}
else if(this.healthType ==='temperature'){
  this.healthTypeName = 'temperature';
  return element.temperature+' F';  
}
else if(this.healthType ==='bmi'){
  this.healthTypeName = 'BMI';
  return element.bmi+' kg/m2';  
}

}
}
