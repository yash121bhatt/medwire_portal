import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service'; 
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

export interface PeriodicElement {
  no: number;
  img: any;
  full_name: string;
  gender: string;
  dob: string;
  mobile_no: number;
  adharcardno: number;
  email: string;
  practice_date: string;
  specialty: string;
  languages: string;
  actions: any;
  
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.sass']
})
export class DoctorListComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }

  closeResult: string;
  deleteId: number;
  imageURL = `${environment.documentUrl}`;

  displayedColumns: string[] = [
    "no",
    "img",
    "full_name",
    "gender",
    "dob",
    "mobile_no",
    "email",
    "staff_name",
    "experience",
     "specialty",
    // "languages",
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
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
    private modalService: NgbModal,
    private router:Router
  ) {

  }

  ngOnInit() {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/clinic/clinic-editmyprofile"]);

    }
    else{

    }
    this.dataSource3.paginator = this.paginator;

    const doctorList = {
      // "role_id" : '8',
      "clinic_id": this.authService.currentUserValue.userid
    }

    this.clinicServiceService.doctorList(doctorList).subscribe(
      (result) => {
        // console.log('all docotor', result);
        //this.Report_doc = result.data;
        this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  // Pop delete Code here
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
      "user_id": this.deleteId,
      "created_by_id":this.authService.currentUserValue.userid
    };
    // console.log('delete = ', deleteData);

    this.clinicServiceService.deleteDoctor(deleteData).subscribe(
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
