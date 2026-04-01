import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

//import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from "@angular/material/slide-toggle";


export interface PeriodicElement {
  no: number;
  img: any;
  full_name: string;
  suggested_by: string;
  gender: string;
  dob: string;
  mobile_no: number;
  adharcardno: number;
  email: string;
  actions: any;
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
  deleteID: any;
  data_fatec: any;
  closeResult: string;
  patientData: any = [];
  user_id: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "profile_image_path",
    "full_name",
    "suggested_by",
    "gender",
    "date_of_birth",
    "mobile_number",
    "email",
    "pin_code",
    "actions",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(null);
  imageURL = `${environment.documentUrl}`;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private clinicServiceService: ClinicServiceService,
    private authService: AuthService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    private router : Router
  ) {

  }
  ngOnInit() {
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

    const data = {
      user_id: this.authService.currentUserValue.userid,
      role_id: 4
    }
    this.clinicServiceService.listPatient(data).subscribe(
      (result) => {
        // console.log(result);
        this.patientData = result.data;
        this.dataSource3 = new MatTableDataSource(result.data);
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
        // console.log(this.patientData);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getdeleteID(id) {
    this.deleteID = id;
  }

  deletePatient() {
    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      patient_id: this.deleteID,
      created_by_id : this.user_id
    }
    this.clinicServiceService.deletePatient(data).subscribe((res: any) => {
      // console.log(res);
      setTimeout(() => {

        this.ngOnInit()
        this.fetch(this.data_fatec);

      }, 300);
      Swal.fire(
        '',
        res.message,
        'success'
      )

    }, (error: any) => {
      console.log(error)
      Swal.fire(
        '',
        error,
        'error'
      )
    })
  }


  // Pop delete Code here
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  fetch(data_fatec) {
    throw new Error("Method not implemented.");
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: "right",
      panelClass: ["bg-red"],
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
