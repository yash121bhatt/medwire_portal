import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';


export interface Reportdoc {
  // image : string;
  name: String;
  order_id: String;
  lab_name: String;
  patient_name: string;
  no: number;
  test_name: string;
  appointment_date: string;
  time_slot: string;
  booking_status: string;
  payment_status: string;
  banking_status: string;
  medwire_status: string;
  payment_id: string;
  payment: number;
  file: string;
}
const ELEMENT_DATA: Reportdoc[] = [
];

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.sass']
})
export class ClinicHistoryComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  user_id: any;
  token: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  rows: [];


  displayedColumns: string[] = [
    "no",
    "appointment_id",
    "patient_name",
    "clinic_name",
    // "test_name",
    "appointment_date",
    "time_slot",
    "booking_status",
    "consulting_fee",
    "payment_id",
    "payment_status",
   // "banking_status",
   // "medwire_status",
    // "file",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.dataSource3.paginator = this.paginator;
    this.fetch((data) => {
      this.rows = data;
      // this.filteredData = rows;
    });
  }

  fetch(_cb: (data: any) => void) {
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = {
      "user_id": this.user_id,
    }

    this.patientServiceService.patientClinicHistory(data).subscribe(
      (result: any) => {
        // console.log('abc',result.data[4].result[0].amount);
        this.rows = result.data;
        // console.log(this.rows);
        this.dataSource3 = new MatTableDataSource(this.rows);
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
        // this.dataSource3.sort = this.sort;
      },

      (err) => {
        console.log(err);
      }
    );
  }

  finalDatareturn(data, i) {


    if (data[i].cart_item.length > 0) {

      // console.log('fd', data[i].cart_item);
      return data[i].cart_item[0].test_name ?? '-';
    }
    else {
    }

  }

}
