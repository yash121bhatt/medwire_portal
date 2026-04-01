import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";



export interface PeriodicElement {
  s_no: string;
  medicine_name: string;
  medicine_type: string;
  actions: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    s_no: "1",
    medicine_name: "Kunochi clinic prescription",
    medicine_type: "23/12/2022",
    actions: " ",
  },
  {
    s_no: "2",
    medicine_name: "November prescription",
    medicine_type: "21/12/2022",
    actions: " ",
  },
  {
    s_no: "3",
    medicine_name: "Dr Batra prescription",
    medicine_type: "22/12/2022",
    actions: " ",
  },
  
];

@Component({
  selector: 'app-pre-notification',
  templateUrl: './pre-notification.component.html',
  styleUrls: ['./pre-notification.component.sass']
})
export class PreNotificationComponent implements OnInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();

  @Input() requestID: any;
  sort: MatSort;
  urlparameter: any;
  imageURL = `${environment.documentUrl}`;
  
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
 
  displayedColumns: string[] = [
    "s_no",
    "medicine_name",
    // "medicine_type",
    // "quantity",
    "frequency",
    "time_dose"
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
    private doctorServiceService : DoctorServiceService,
    private patientServiceService : PatientServiceService
  ) { }

  ngOnInit(): void {

    const data ={
      requestId: this.requestID
     }
  
     this.doctorServiceService.checkAccessdetail(data).subscribe(
      (result)=>{
       
        this.preNotification(result.data);
        //this.documentData(result.data);
        //this.listReportDoc(result.data);
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
      
                )
        }
     )
  }

  preNotification(data){
    const datapreNotification = { 
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
   };
   
    this.patientServiceService.preMedicineList(datapreNotification).subscribe(
      (result: any) => {
        //this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(result.data);
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.empTbSort;
      },

      (err) => {
        console.log(err);
      }
    );
  }
  

  
  getFrequencyTime(fourthTime, thriceTime, twiceTime,onceTime){
    if(fourthTime!='' && fourthTime!=null){
        return 'Four times in a day';
    }
    else if(thriceTime!='' && thriceTime!=null){
      return 'Thrice Daily';
     }
     else if(twiceTime!='' && twiceTime!=null){
      return 'Twice Daily';
     }
     else if(onceTime!='' && onceTime!=null){
      return 'Once Daily';
     }
  else{
    return 'Once Daily';
  }

}
}

  


