import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PatientdataService } from 'src/app/services/patientdata.service';


export interface Reportdoc {
  name: String;
  date_time: string;
}
const ELEMENT_DATA: Reportdoc[] = [];


@Component({
  selector: 'app-medicine-ntfctn',
  templateUrl: './medicine-ntfctn.component.html',
  styleUrls: ['./medicine-ntfctn.component.sass']
})
export class MedicineNtfctnComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  // sort: MatSort;
  urlparameter: any;
  memberID: string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }


  displayedColumns: string[] = [
    "sno",
    "medicine_name",
    //"medicine_type",
    // "quantity",
    "frequency",
    "take_time_one",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [
  ];

  // data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [
  ];

  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  data: any;
  user_id: any;
  token: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private authService: AuthService,
    private patientServiceService: PatientServiceService,
    private route: ActivatedRoute,
    private patientdataService: PatientdataService
  ) {
    this.editForm = this.fb.group({
      id: new FormControl(),
      img: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
    });
  }

  closeResult: string;
  deleteId: number;
  error_message: boolean = false;
  error_message_text: string;

  ngOnInit() {
    this.memberID = this.route.snapshot.paramMap.get('type');
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
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type'))
    };

    this.patientServiceService.preMedicineList(data).subscribe(
      (result: any) => {
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

  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      email: row.email,
      address: row.address,
      img: row.img,
    });
  }
  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.register.patchValue({
      id: this.getId(10, 100),
    });

  }

  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id != id;
    });
  }
  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id == form.value.id) {
        value.firstName = form.value.firstName;
        value.lastName = form.value.lastName;
        value.phone = form.value.phone;
        value.gender = form.value.gender;
        value.email = form.value.email;
        value.address = form.value.address;
      }
      this.modalService.dismissAll();
      return true;
    });
    this.showNotification(
      "bg-black",
      "Edit Record Successfully",
      "bottom",
      "right"
    );
  }

  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.rows = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
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

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getdeleteId(Id: number) {
    console.log(Id);
    this.deleteId = Id;
  }
  deleteRecord() {

    const deleteData = {
      "medicine_id": this.deleteId,
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type'))
    };

    this.patientdataService.deletePreMedicine(deleteData).subscribe(
      (result) => {
        Swal.fire(
          'Deleted successfully!',
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

  getFrequencyTime(fourthTime, thriceTime, twiceTime,onceTime){
    if(fourthTime!='' && fourthTime!=null){
        return 'Four times in a day';
    }
    else if(thriceTime!='' && thriceTime!=null){
      return 'Thrice Daily';
     }
     else if(twiceTime!='' && twiceTime!=null){
      return 'Twice Daily';
     }
     else if(onceTime!='' && onceTime!=null){
      return 'Once Daily';
     }
  else{
    return 'Once Daily';
  }

}
}
export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}