import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export interface Reportdoc {
  // image : string;
  name: String;
  no: number;
  test_name: string;
  appointment_for: string;
  date: string;
  time_slot: string;
  referBy: string;
  status: string;
  file: string;
}
const ELEMENT_DATA: Reportdoc[] = [
];

@Component({
  selector: 'app-laboratory-appointments',
  templateUrl: './laboratory-appointments.component.html',
  styleUrls: ['./laboratory-appointments.component.sass']
})
export class LaboratoryAppointmentsComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  user_id: any;
  userName: string;
  userid: any;
  UsersList: any;
  id: any;
  created_by_id: any;
  htmlReturn: string;
  imageURL = `${environment.labDocumentUrl}`;
  getPaymentUrllink: string;
  closeResult: string;
  

  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  rows: [];

  displayedColumns: string[] = [
    "no",
    "id",
    "lab_name",
    "lab_address",
    "test_name",
    //"doctor",
    "first_name",
    "appointment_date",
    "time_slot",
    "appointments_user_type",
    "reason_of_reschedule",
    "grand_total",
    "report_document",
    "payment_status",
    "appointment_status",
    "shareReport"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private patientServiceService: PatientServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private patientdataService: PatientdataService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      if(params['payment_status']!='' && params['payment_status']!=undefined){
        //console.log(params['payment_status']);
        let payment_status = params['payment_status'];
        const otherpaymentStatus =  'Payment '+payment_status;
         if(payment_status=='Success'){
          Swal.fire(
            '',
            'Payment Success',
            'success'
          )
         }else{
          Swal.fire(
            '',
            otherpaymentStatus,
            'error',
        
          )
         }
      }
     
    });

    this.fetch((data) => {
      this.rows = data;
    });
    this.dataSource3.paginator = this.paginator;

    //Users List API
    this.userName = this.authService.currentUserValue.firstName;

    this.userid = this.authService.currentUserValue.userid;
    const userId = {
      "id": this.userid
    }
    this.patientdataService.memberList(userId).subscribe(
      (result) => {
        this.UsersList = result.data;

      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Appointment List API
  fetch(_cb: (data: any) => void) {
    this.id = this.route.snapshot.paramMap.get('userId');

    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      "user_id": this.id,
    }
    this.patientServiceService.appointmentList(data).subscribe(
      (result: any) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);

        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.sort;
        // console.log(this.rows);

      },

      (err) => {
        console.log(err);
      }
    );
  }

  finalDatareturn(data, i) {
    if (data[i].cart_item.length > 0) {

      return data[i].cart_item[0].test_name ?? '-';
    }
    else {
    }

  }
  labName(data, i) {
    if (data[i].mamber_names.length < 0) {
      return data[i].mamber_names[0].first_name;

    }
  }

  returnPdf(image) {
    if (image != '-') {
      this.htmlReturn = '<img src="assets/images/pdf.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  //View File
  viewFile(image) {
    if (image !== '-') {
      this.htmlReturn = '<i class="fa fa-eye file-style col-blue font-20"></i>';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonn(reason)}`;
    });
  }

  private getDismissReasonn(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getPaymentUrl (url: string){
    this.getPaymentUrllink = url;
  }


  addpaymentbyUrl() {
        window.location.href =this.getPaymentUrllink;   
  }
}