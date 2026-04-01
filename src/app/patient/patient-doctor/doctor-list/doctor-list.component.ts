import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
export interface PeriodicElement {
  no: number;
  img: any;
  doctorName: string;
  clinic: string
  speciality:any;
  experience_in_year:any;
  action: any;

}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.sass']
})
export class DoctorListComponent implements OnInit {
  deleteUser_id:any;
  doctor_id:any;
  id:any;
  data:any;
  doctorForm: FormGroup;
  fb: FormBuilder;
  speciality:[];
  temp: any[];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  closeResult: any;
  imageURL = `${environment.documentUrl}`;
  deleteID: any;
  rows: any;

  
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "doctor_profile",
    "doctor",
    "clinic_logo",
    "clinic",
    "speciality",
    // "experience_in_year",
    "action",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private patientdataService: PatientdataService,
    private authService : AuthService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private router : Router
    ) {


      // this.doctorForm = this.fb.group({
      //   user_id: new FormControl(),
      // });
  
      // this.fetch(data => {
      //   this.temp = [...data];
      //   this.rows = data;
      // });
  

    }
  fetch(arg0: (data: any) => void) {
    throw new Error("Method not implemented.");
  }
  ngOnInit() {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
    
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'error'
      )
        this.router.navigate(["/patient/editprofile"]);

    }
    else{

    }
    this.doctorList()
    this.dataSource3.paginator = this.paginator;
  }

  doctorList(){
    let data = {
      user_id : this.authService.currentUserValue.userid
    }
    this.patientdataService.doctorList(data).subscribe((res:any)=>{
        console.log(res);
        this.dataSource3 = res.data;

        this.dataSource3 = new MatTableDataSource(res.data); 
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
        //this.speciality = res.data.speciality[0];
        // console.log(res.data.speciality[0].speciality_name);
    },(error:any)=>{
      console.log(error);
    })
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

   // Pop delete Code here
   open(content) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getdeleteID(id){ 
   this.deleteID = id;
  }

  deleteDoctor(){
    // console.log(id);
    
     const data = { 
       user_id: this.deleteID
     };
    this.patientdataService.deleteDoctor(data).subscribe((res:any)=>{
      console.log(res);
      setTimeout(()=> {

        this.doctorList()
        this.fetch(this.data);
        
      }, 300 );
     

      Swal.fire(
        '',
        res.message,
        'success'
      )
      
    },(error:any)=>{
      Swal.fire(
        '',
         error,
        'error'
      )
      console.log(error);
    })
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

}