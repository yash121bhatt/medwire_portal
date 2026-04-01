import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import Swal from "sweetalert2";
import { AuthService } from "src/app/core/service/auth.service";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PatientServiceService } from "src/app/services/patient-service.service";
import { environment } from "src/environments/environment";
export interface PeriodicElement {
  no: number;
  profile_image: any;
  full_name: string;
  gender: string;
  mobile_no: number;
  email: string;
  address: string;
  pincode: number;
  experience_year: string;
  doctor_degree: string;
  specialty: string;
  languages: string;
  status: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-doctor-management',
  templateUrl: './doctor-management.component.html',
  styleUrls: ['./doctor-management.component.sass']
})
export class DoctorManagementComponent implements OnInit {
  user_id: any;
  rows : [];
  approved_id: number;
  closeResult: string;
  token: string;
  imageURL = `${environment.documentUrl}`;
  showApproveDialog() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "<p><b>Approved</b></p>",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  showCancelDialog() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "<p>Disapproved</b></p>",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "profile_image",
    "doctor_name",
    "gender",
    "mobile",
    "email",
    "address",
    "pin_code",
    "experience_in_year",
    "speciality",
    "degree",
    "request_status",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private authService : AuthService,
    private router:Router,
    private modalService: NgbModal,
    private patientServiceService : PatientServiceService,
  ) { }

  ngOnInit() {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/doctor/labeditprofile"])

    }
    else{

    }

    this.fetch((data) => {
      this.rows = data;
      // this.filteredData = rows;
    });
    this.dataSource3.paginator = this.paginator;
  }

  fetch(_cb: (data: any) => void) {
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = {
      user_id : this.authService.currentUserValue.userid, 
    }   
    // console.log(this.user_id);
    
    this.patientServiceService.doctorManagementList(data).subscribe(
      (result:any) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);
        
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.empTbSort;
      },
      
      (err) => {
        console.log(err);
      }
    );
  }

  approveLab(id:number){
    this.approved_id = id;
  
   }
   disapproveLab(id:number){
     this.approved_id = id;
   }
  
   approvedRequest(){
    const data = {
      // "user_id" : this.approved_id,
      user_id : this.approved_id,
      request_status : "Approved",
     }
  
     this.patientServiceService.DoctorlabRadioChangeStatus(data).subscribe(
      (result)=>{
        //  console.log(result);
         if(result.status_code == 200){
          setTimeout(() => {
           //  this.success_message= false;
           Swal.fire(
             '',
             result.message,
             'success'
           )
           //  this.router.navigate(["/admin/my-profile"]);
           const currentUrl = this.router.url;
             this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
               this.router.navigate([currentUrl]);
             });
           }, 500);
       }
      },
      (err)=>{
        console.log(err);
      }
     )
  }
  
  
   
  disApprovedRequest(){
    const data = {
      user_id : this.approved_id,
      request_status : "Disapproved",
     }
  
     this.patientServiceService.DoctorlabRadioChangeStatus(data).subscribe(
      (result)=>{
        //  console.log(result);
         if(result.status_code == 200){
          setTimeout(() => {
           //  this.success_message= false;
           Swal.fire(
             '',
             result.message,
             'success'
           )
           //  this.router.navigate(["/admin/my-profile"]);
           const currentUrl = this.router.url;
             this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
               this.router.navigate([currentUrl]);
             });
           }, 500);
       }
      },
      (err)=>{
        console.log(err);
      }
     )
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
   // Pop delete Code here
   open(content) {
      
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  openDisapprove(content) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}