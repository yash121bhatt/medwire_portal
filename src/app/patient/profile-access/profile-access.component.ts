import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TimeIntervalComponent } from './time-interval/time-interval.component';

import Swal from "sweetalert2";
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


export interface PeriodicElement {
  medwire_id: string;
  patient: string;
  doctor: string;
  request_date: string;
  address: string;
  pincode: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [ 
];
@Component({
  selector: 'app-profile-access',
  templateUrl: './profile-access.component.html',
  styleUrls: ['./profile-access.component.sass']
})
export class ProfileAccessComponent implements OnInit {
  closeResult = "";
  appointmentID: number;
  request_id: any;
  customWithFunction() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0826C6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  }
  customWithFunctionwarn() {
    Swal.fire({
      text: "Are you sure to decline the request?",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#0826C6",
      confirmButtonText: "Yes",
    })
  }
  displayedColumns: string[] = [
    "no",
    "medwire_id",
    "patient_name",
    "doctor_name",
    "requested_at",
    "status",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(
    
  );

  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  } 
  public addCusForm: FormGroup;
  firstName: string;
  dialogConfig: MatDialogConfig;
  constructor(
    private dialogModel: MatDialog,
    private fb: FormBuilder,
    private authService : AuthService,
    private patientdataService : PatientdataService,
    private modalService: NgbModal,
    ) { 
    
  }

  ngOnInit() {
   
    this.addCusForm = this.fb.group({
      time_set: [ "", [Validators.required],
      ],
      
    });
    this.getprofileAccessList();
   
  }
  openDialog(): void {
    const dialogRef = this.dialogModel.open(TimeIntervalComponent, {
      width: "480px",
      disableClose: true,
    });
  }
  onSubmit() {
  }

  getprofileAccessList (){
    const data = {
      user_id : this.authService.currentUserValue.userid,
      role_id : this.authService.currentUserValue.roleID
    }
    this.patientdataService.getAccessProfileList(data).subscribe(
     (result)=>{
      this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
     },
     (err)=>{

     }
    );
  }


   // Pop delete Code here

   getRequest_id(request_id){
    this.request_id = request_id;
   }

 deleteopen(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  cancelRequestopen(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  timeRequestopen(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getId(Id:number) {
    this.appointmentID = Id;
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

  deleteProfileRequest(){
    const data = {
      request_id:this.request_id
    }

    this.patientdataService.deleteRequestAccess(data).subscribe(
      (result)=>{
        Swal.fire(
          '',
          result.message,
          'success'
        );

        this.ngOnInit();
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        );
      }
    );
  }

  cancelProfileRequest(){
    const data = {
      request_id:this.request_id,
      status    :"Reject",
      time_interval:"",
}

    this.patientdataService.profileAccessrequest(data).subscribe(
      (result)=>{
        Swal.fire(
          '',
          result.message,
          'success'
        );

        this.ngOnInit();
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
      }
    );
  }

  onSubmitClick(){
    const data = {
      request_id:this.request_id,
      status    :"Accept",
      time_interval:this.addCusForm.value.time_set,
}

this.patientdataService.profileAccessrequest(data).subscribe(
  (result)=>{
    Swal.fire(
      '',
      result.message,
      'success'
    )
    this.ngOnInit();
    },
   (err)=>{
    Swal.fire(
      '',
      err,
      'error'
    )
   }
  );

  }
  }



