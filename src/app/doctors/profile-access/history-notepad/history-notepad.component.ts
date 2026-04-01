import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
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
  selector: 'app-history-notepad',
  templateUrl: './history-notepad.component.html',
  styleUrls: ['./history-notepad.component.sass']
})
export class HistoryNotepadComponent implements OnInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();

  @Input() requestID: any;
  sort: MatSort;
  urlparameter: any;
  imageURL = `${environment.documentUrl}`;
  notepadType: any;
  resultdatadetail: any;
  
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
 
  displayedColumns: string[] = [
    "s_no",
    "created_at",
    "description",
   
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
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
        this.notepadType = 'current_medication';
        this.resultdatadetail = result.data;
        
        this.gethistroyNotepad(result.data);
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

  gethistroyNotepad(data:any,){
    const datasend = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": this.notepadType,
    };
    this.patientServiceService.historyNotepadList(datasend).subscribe(
      (result: any) => {
        // console.log(this.rows);
       // this.rows = result.data;
      //  console.log('notepad ',result);
        this.dataSource3 = new MatTableDataSource(result.data);
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.empTbSort;
      },

      (err) => {
        console.log(err);
      }
    );
  }
  
  getHealthResult(type:any){
     this.notepadType = type;
     this.gethistroyNotepad(this.resultdatadetail);
  }
}
