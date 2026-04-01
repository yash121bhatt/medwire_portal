import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClinicEditmyprofileComponent } from 'src/app/clinic/clinic-editmyprofile/clinic-editmyprofile.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { I } from '@angular/cdk/keycodes';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



export interface Reportdoc {
  // image : string;
  name: String;
  clinic_name: String;
  no: number;
  reason: string;
  date: string;
  time_slot: string;
  status: string;
  file: string;
  patientMemberId: any;
  appointments_user_type:any;
}
const ELEMENT_DATA: Reportdoc[] = [];

@Component({
  selector: 'app-booked-appointment-list',
  templateUrl: './booked-appointment-list.component.html',
  styleUrls: ['./booked-appointment-list.component.sass']
})
export class BookedAppointmentListComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  activatedmemberID: string;
  colClassName: string;
  payClassName: string;
  paymentStatus: any;
  patientMemberId: string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }

  imageURLpdf = `${environment.prescriptionpdfUrl}`;

  displayedColumns: string[] = [
    "no",
    "appointment_id",
    "clinic_name",
    "clinic_address",
    "doctor_name",
    "reason",
    "appointment_date",
    "time_slot",
    "reason_of_reschedule",
    "total_amount",
    "status",
    'payment_status',
    "actions",
    "shareReport",
    "appointments_user_type",
    // "file",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  htmlReturn: string = '<i class="far fa-file-pdf file-style col-red font-20"></i>';
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private patientdataService: PatientdataService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['payment_status'] != '' && params['payment_status'] != undefined) {
        //console.log(params['payment_status']);
        let payment_status = params['payment_status'];
        const otherpaymentStatus = 'Payment ' + payment_status;
        if (payment_status == 'Success') {
          Swal.fire(
            '',
            'Payment Success',
            'success'
          )
        } else {
          Swal.fire(
            '',
            otherpaymentStatus,
            'error',

          )
        }
      }

    });

    this.activatedmemberID = this.activatedRoute.snapshot.paramMap.get('id');
    this.patientMemberId = this.activatedRoute.snapshot.paramMap.get('id')
    this.dataSource3.paginator = this.paginator;
    const data = {
      user_id: this.activatedmemberID
    }

    this.patientdataService.doctorAppointmentList(data).subscribe(
      (result) => {
        this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err) => {

      }
    );
  }

  convertReason(data: any) {
    return JSON.parse(data);

  }

  conditionCheck(data: any) {
    if (data === 'Completed') {
      return true;
    }
    else {
      return false;
    }
  }

  classConditioncheck(status: any) {
    if (status == 'Approved') {
      this.colClassName = 'badge col-Approved';
    }
    else if (status == 'Completed') {
      this.colClassName = 'badge col-Completed';
    }
    else if (status == '') {
      this.colClassName = 'badge col-Pending';
    }
    else {
      this.colClassName = 'badge col-Pending';
    }
  }

  classConditionPayment(pay_status: any) {
    if (pay_status == 'Pending') {
      this.payClassName = 'badge col-Approved';
      this.paymentStatus = 'Pending';

    }
    else if (pay_status == 'TXN_SUCCESS') {
      this.payClassName = 'badge col-Completed';
      this.paymentStatus = 'Success';
    }
    else if (pay_status == 'TXN_FAILURE ') {
      this.payClassName = 'badge col-Cancel';
      this.paymentStatus = 'Failed';
    }
    else {
      this.payClassName = 'badge col-Pending';
      this.paymentStatus = 'Failed';
    }

  }

  changeButton(show: any) {
    if (show === 'online') {
      return 'call'
    } else {
      return ''
    }
  }


  getOnlineAppointment() {
    const data = {
      patient_id: this.patientMemberId,
    }

    this.patientdataService.getOnlineAppointment(data).subscribe((res: any) => {
      // window.location.href =res.data.join_url;
      setTimeout(() => {
        Swal.fire(
          '',
          res.message,
          'success'
        );
      }, 1000);

      let url = res.data.join_url;
      environment.meetingLinkPatient = url;
      this.router.navigate(['patient/meet/']);
          
    },
      (error: any) => {
        Swal.fire(
          '',
          error,
          'error'
        )
      }
    )
  }
}
