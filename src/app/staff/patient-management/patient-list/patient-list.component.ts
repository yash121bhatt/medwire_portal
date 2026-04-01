import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { ClinicServiceService } from "src/app/services/clinic-service.service";
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
export interface PeriodicElement {
  no: number;
  medwire_id: string;
  img: any;
  full_name: string;
  referred_by: string;
  inquiry_date: string;
  gender: string;
  dob: string;
  mobile_no: number;
  adharcardno: number;
  email: string;
  actions: any;
  address: string;
  pincode: number;
}
const ELEMENT_DATA: PeriodicElement[] = [];

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
  patientData: any = [];
  created_by_id: any;
  imageURL = `${environment.documentUrl}`;
  deleteId: any;
  closeResult: string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "profile_image_name",
    "medwire_id",
    "full_name",
    "suggested_by_name",
    "staff_name",
    "enquiry_date",
    "gender",
    "date_of_birth",
    "mobile_number",
    // "adharcardno",
    "email",
    "address",
    "pin_code",
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
    private clinicServiceService: ClinicServiceService,
    private authService: AuthService,
    private clinicService: ClinicServiceService,
    private modalService: NgbModal,
  ) { }
  ngOnInit() {
 
    this.staffDetail();
    this.dataSource3.paginator = this.paginator;
    
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
          this.getAllPatientList();
        }
        // console.log('----', this.created_by_id);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllPatientList() {
    this.dataSource3.paginator = this.paginator;

    const data = {
      "user_id": this.created_by_id,
      "role_id": '8',
      "staff_id": this.authService.currentUserValue.userid

    }
    // console.log(this.created_by_id);

    this.clinicServiceService.listPatient(data).subscribe(
      (result) => {

        this.patientData = result.data;
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
      "patient_id": this.deleteId,
      "created_by_id": this.created_by_id,
      // 'staff_id' : this.authService.currentUserValue.userid,
    };
    // console.log('delete = ', deleteData);

    this.clinicServiceService.deletePatient(deleteData).subscribe(
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
