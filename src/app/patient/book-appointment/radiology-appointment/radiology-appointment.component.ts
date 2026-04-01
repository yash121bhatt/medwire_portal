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
}
const ELEMENT_DATA: Reportdoc[] = [];

@Component({
  selector: 'app-radiology-appointment',
  templateUrl: './radiology-appointment.component.html',
  styleUrls: ['./radiology-appointment.component.sass']
})
export class RadiologyAppointmentComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  user_id: any;
  userName: string;
  userid: any;
  UsersList: any;
  id: string;
  dicomUrl = `${environment.dicomUrl}`;
  imageURL = `${environment.labDocumentUrl}`;
  htmlReturn: string;
  getPaymentUrllink: string;
  closeResult: string;
  isDisable: string;
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
   // "doctor",
    "first_name",
    "appointment_date",
    "time_slot",
    "appointments_user_type",
    "reason_of_reschedule",
    "grand_total",
    "dcm_document",
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
    this.id = this.route.snapshot.paramMap.get('userId');

    this.userid = this.authService.currentUserValue.userid;
    const userId = {
      "id": this.userid
    }
    this.patientdataService.memberList(userId).subscribe(
      (result) => {
        this.UsersList = result.data;
        // console.log(this.UsersList);

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
      "role_id": '4'
    }
    this.patientServiceService.appointmentList(data).subscribe(
      (result: any) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);

        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.sort;
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
  // labName(data, i) {
  //   if (data[i].mamber_names.length < 0) {

  //     return data[i].mamber_names[0].first_name;

  //   }
  // }

  //Report DICOM File
  returnPdf(image) {
    if (image !== '-') {
      this.htmlReturn = '<img src="assets/images/pdf.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  //View File
  viewDicomFile(image) {
    if (image !== '-') {
      this.htmlReturn = '<img src="assets/images/dicom1.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }
  //Report Redirect
  viewReport(fn: string) {
    if (fn !== '-') {
   //   localStorage.setItem('dicomFile', fn);
     // if (localStorage.getItem('dicomFile')) {
        window.open(fn);
   //   }
    }
    else {
      return false;
    }
  }

  // returnPdfradio(image){

  //   if(image !='-'){
  //   const myFileType = image.split(/[#?]/)[0].split('.').pop().trim();
    
  //   if(myFileType=='pdf'){
  //   this.isDisable = '';
  //   this.htmlReturn = '<img src="assets/images/pdf.png">';
  //   }
  //   else{
  //   this.isDisable = '';
  //   this.htmlReturn = '<img src="assets/images/dicom1.png">';
  //   }
    
    
  //   }
  // }

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