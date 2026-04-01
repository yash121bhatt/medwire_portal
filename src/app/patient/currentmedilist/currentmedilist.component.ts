import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Reportdoc {
  s_no: string | Number;
  created_date: String | Number;
  description: string;
}
const ELEMENT_DATA: Reportdoc[] = [];

@Component({
  selector: 'app-currentmedilist',
  templateUrl: './currentmedilist.component.html',
  styleUrls: ['./currentmedilist.component.sass']
})
export class CurrentmedilistComponent implements OnInit {

  //mat-tablle-filter

  displayedColumns: string[] = [
    "s_no",
   // "created_date",
    "description",
    "action",
  ];

  @ViewChild('empTbSort') empTbSort = new MatSort();
 // sort: MatSort;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  
  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows: any = [];
  newUserImg = "assets/images/user/patient.jpg";
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [];

  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  user_id: any;
  token: any;
  data: any;
  result: any;
  description: any;
  created_date: any;
  urlparameter: string;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private authService: AuthService,
    private patientServiceService: PatientServiceService,
  ) {
    this.editForm = this.fb.group({
      // id: new FormControl(),
      img: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
    });
    this.fetch((rows) => {
      this.rows = rows;
      this.filteredData = rows;
    });
  }
  ngOnInit() {
      this.urlparameter = this.route.snapshot.paramMap.get('type');
      this.dataSource3.paginator = this.paginator;
  }


  fetch(_cb: (data: any) => void) {


    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "type": "current_medication",
      "description" : this.description,
      "created_date" : this.created_date,
    };
    this.patientServiceService.historyNotepadList(data).subscribe(
      (result: any) => {
        // console.log(this.rows);
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
  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open("GET", "assets/data/healthistorysexternaldata.json");
  //   req.onload = () => {
  //     const rows = JSON.parse(req.response);
  //     console.log(rows);
  //     cb(rows);
  //   };
  //   req.send();
  // }

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
      // id: this.getId(10, 100),
      img: this.newUserImg,
    });
  }
  deleteRow(row) {
    this.rows = this.arrayRemove(this.rows, row.id);
    this.showNotification(
      "bg-red",
      "Delete Record Successfully",
      "bottom",
      "right"
    );
  }
  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id != id;
    });
  }
  onEditSave(form: FormGroup) {
    this.rows = this.rows.filter((value, key) => {
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
  onAddRowSave(form: FormGroup) {
    this.rows.push(form.value);
    this.rows = [...this.rows];
    // console.log(this.data);
    form.reset();
    this.modalService.dismissAll();
    this.showNotification(
      "bg-green",
      "Add Record Successfully",
      "bottom",
      "right"
    );
  }
  remove_htmltag(data){
    return data.replace( /(<([^>]+)>)/ig, '');
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
export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}