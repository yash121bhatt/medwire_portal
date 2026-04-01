import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { AuthService } from "src/app/core/service/auth.service";
import { ClinicServiceService } from "src/app/services/clinic-service.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
export interface PeriodicElement {
  no: number;
  img: any;
  full_name: string;
  gender: string;
  mobile_no: number;
  email: string;
  experience_year: string;
  doctor_degree: string;
  specialty: string;
  languages: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
];
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
  imageURL = `${environment.documentUrl}`;
  deleteId: number;
  closeResult: string;
  created_by_id: any;
  staff_id: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "img",
    "full_name",
    "gender",
    "mobile_number",
    "email",
    "experience_in_year",
    "staff_name",
    "specialities",
    "degrees",
   
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
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicServiceService
  ) { }

  ngOnInit() {
    this.staffDetail();
   
   
    setTimeout(() => {
      this.doctorsList();
    }, 1000);
  }

  //Staff detail api for clinic id
  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          // console.log(result);
          this.created_by_id = result.data[0].created_by_id;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //All doctors list api
  doctorsList() {
   
    const doctorList = {
      "clinic_id": this.created_by_id,
      // "role_id": '8',
      "staff_id": this.authService.currentUserValue.userid
    }

    this.clinicServiceService.doctorList(doctorList).subscribe(
      (result) => {
        // console.log('all docotor', result);
        this.dataSource3 = new MatTableDataSource(result.data);
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Pop delete doctor Code here
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getId(Id: number) {
    // console.log(Id);
    this.deleteId = Id;
  }
  deleteRecord() {

    const deleteData = {
      "user_id": this.deleteId,
      "created_by_id":this.created_by_id,
      'staff_id' : this.authService.currentUserValue.userid,
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
