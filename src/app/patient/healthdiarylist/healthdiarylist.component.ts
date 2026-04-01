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
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Reportdoc {
  created_date: String | Number;
  description: string;
}
const ELEMENT_DATA: Reportdoc[] = [];

@Component({
  selector: 'app-healthdiarylist',
  templateUrl: './healthdiarylist.component.html',
  styleUrls: ['./healthdiarylist.component.sass']
})
export class HealthdiarylistComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  //sort: MatSort;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }


  displayedColumns: string[] = [
    "s.no.",
    "created_date",
    "description",
    "action",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(null);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  
  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
  selectedRowData: selectRowInterface;
  newUserImg = "assets/images/user/patient.jpg";
  // data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [
    { name: "Date" },
    { name: "Note" },
    { name: "Actions" },
  ];
  
  // Table 2
  tb2columns = [
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Address" },
  ];
  tb2data = [];
  tb2filteredData = [];
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  urlparameter: any;
  user_id: number;
  description: any;
  created_date: any;
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

    this.urlparameter=this.route.snapshot.paramMap.get('type')
  }
  ngOnInit() {
    this.fetch((rows) => {
      this.rows = rows;
      this.filteredData = rows;
    });
    this.register = this.fb.group({
      id: [""],
      img: [""],
      firstName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastName: [""],
      phone: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [""],
    });

    this.dataSource3.paginator = this.paginator;
  }
  
  fetch(_cb: (data: any) => void) {

    // console.log('ID is = ', this.route.snapshot.paramMap.get('type'));

    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "type": "personal_health_dairy",
      "description" : this.description,
      "created_date" : this.created_date,
    };
    this.patientServiceService.historyNotepadList(data).subscribe(
      (result: any) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.empTbSort;
      },

      (err) => {
      }
    );
  }
  
  remove_htmltag(data){
    return data.replace( /(<([^>]+)>)/ig, '');
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
    this.selectedRowData = row;
  }
  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.register.patchValue({
      id: this.getId(10, 100),
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
}
export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}