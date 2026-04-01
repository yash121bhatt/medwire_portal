import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export interface Reportdoc {
  // image : string;
  doctor_name: String ;
  test_name : string ;
  order_id: String ;
  clinic_name: String ;
  patient_name: string;
  no: number;
  reason : string;
  date : string;
  time_slot : string;
  booking_status : string;
  payment_status : string;
  banking_status : string;
  medwire_status : string;
  payment_id : string;
  payment : number;
  file : string;
}
const ELEMENT_DATA: Reportdoc[] = [];

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.sass']
})
export class BillingHistoryComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  user_id: any;
  token: string;
  userid: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  rows: [];


  displayedColumns: string[] = [
    "no",
    "appointment_id",
    "patient_name",
    // "doctor",
    "test_name",
    // "name",
    // "reason",
    "appointment_date",
    "time_slot",
    "booking_status",
    "payment_status",
    "banking_status",
   // "medwire_status",
    "payment_id",
    "total_amount",
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
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/radiology/radioeditprofile"])

    }
    else{

    }

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
   // console.log('---',this.user_id);

    this.patientServiceService.labAppointmentsHistory(data).subscribe(
      (result: any) => {
        // console.log('abc',result.data[4].result[0].amount);
        this.rows = result.data;
        //console.log(this.rows);
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

      //console.log('fd', data[i].cart_item);
      return data[i].cart_item[0].test_name ?? '-';
    }
    else {
    }

  }
}