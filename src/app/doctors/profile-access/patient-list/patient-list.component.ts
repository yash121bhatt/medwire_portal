import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


export interface PeriodicElement {
  no: number;
  img: any;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  mobile_no: number;
  email: string;
  actions: any;
  pincode: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    img: "assets/images/user/clinic_doc.jpg",
    first_name: "John",
    last_name: "Doe",
    gender: "Male",
    dob: "21-05-1994",
    mobile_no: 7858585485,
    email: "test@example.com",
    pincode:452556,
    actions: " ",
  },
  {
    no: 2,
    img: "assets/images/user/user_2.jpeg",
    first_name: "Hinata",
    last_name: "Hyuga",
    gender: "Female",
    dob: "12-02-1887",
    mobile_no: 8989545658,
    email: "hyugahin@example.com",
    pincode:565852,
    actions: " ",
  },
  {
    no: 3,
    img: "assets/images/user/doctor.jpg",
    first_name: "John",
    last_name: "Carter",
    gender: "Female",
    dob: "12-02-1887",
    mobile_no: 9896584585,
    email: "barnrose@example.com",
    pincode:859654,
    actions: "",
  },
  
];
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.sass']
})
export class PatientListComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  imageURl = `${environment.documentUrl}`
  deleteId: number;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  showTitleErorIcon() {
    
  }
  displayedColumns: string[] = [
    "no",
    "image",
    "patient_name",
    "gender",
    // "dob",
    "mobile",
    "email",
    "pin_code",
    "time_interval",
    "access_profile",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  closeResult: string;

  constructor(
  private authService : AuthService,
  private doctorServiceService : DoctorServiceService,
  private router : Router,
  private modalService: NgbModal,
  private route: ActivatedRoute,


  ) {
     
  }

  ngOnInit() {

    this.dataSource3.paginator = this.paginator;
    const data ={
      user_id:this.authService.currentUserValue.userid,
      role_id:this.authService.currentUserValue.roleID
    }
    this.doctorServiceService.accessProfileList(data).subscribe(
      (result)=>{
        this.dataSource3 = new MatTableDataSource(result.data);
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err)=>{

      }
    )

   
  }

  accessProfileBtn(request_id:any){
     const data ={
      requestId :request_id
}
this.doctorServiceService.accessProfilecheck(data).subscribe(
  (result)=>{
    // Swal.fire(
    //   '',
    //   result.message,
    //   'success'
    // )
  this.router.navigate(['/doctors/profile-access/patient-profile/'+request_id]);
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

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getId(Id:number) {
    // console.log(Id);
    this.deleteId = Id;
  }
  deleteRecord() {

    const deleteData = {
      "request_id": this.deleteId,
    };

    this.doctorServiceService.deleteprofileRequest(deleteData).subscribe(
      (result) => {
        Swal.fire(
          '',
          result.message,
          'success'
        )
        this.ngOnInit();
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
        //this.error_message= true;
        //this.error_message_text=err;
      }
    );


    //Test
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  resendopen(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  resendRequest(){
    const resendData = {
      "requestId": this.deleteId,
    };

    this.doctorServiceService.resendprofileRequest(resendData).subscribe(
      (result) => {
        Swal.fire(
          '',
          result.message,
          'success'
        )
        this.ngOnInit();
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
        //this.error_message= true;
        //this.error_message_text=err;
      }
    );
  }
}