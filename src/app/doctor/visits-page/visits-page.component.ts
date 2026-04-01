import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";
import * as moment from 'moment';

export interface Reportdoc {
  sn: any;
  name: String;
  date_time: string;
  category: string;
  subCategory: string;
  reportStatus: string;
}
const ELEMENT_DATA: Reportdoc[] = [
  // {name: 'John Doe', date_time: '12/08/2022, 02:00 PM', category: 'Blood Test', subCategory: 'Diabities'},
];

@Component({
  selector: 'app-visits-page',
  templateUrl: './visits-page.component.html',
  styleUrls: ['./visits-page.component.sass']
})
export class VisitsPageComponent implements OnInit {


  size = 1024 * 1024;
  //mat-tablle-filter
  urlparameter: any;
  user_id: any;
  token: string;
  lab_id: any;
  visit_id: any;
  // report_document: any;
  htmlReturn: string;
  imageURL = `${environment.labDocumentUrl}`;


  displayedColumns: string[] = [
    "sn",
    "username",
    "mobile",
    "visit_created_at",
    "category",
    "sub_category",
    "reportStatus",
    "addReport",
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  warning: boolean;
  uploadObj: any;
  showBtn: boolean = false;
  loading: boolean;
  fileTypeCheck: boolean = false;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [
  ];
  newUserImg = "assets/images/user/user1.jpg";
  data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  private form: FormData;
  uploadFileForm: FormGroup;
  selectedOption: string;
  MAX_SIZE: number = 5242880;
  report_document: any = null;
  messages: string[] = [];
  // public loading: boolean = false;

  columns = [
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Gender" },
    { name: "Phone" },
    { name: "Email" },
    { name: "Address" },
  ];
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private authService: AuthService,
    private patientServiceService: PatientServiceService,
    private router: Router
  ) {

    this.editForm = this.fb.group({
    });

    this.uploadFileForm = new FormGroup({
      report_document: new FormControl()
    });
  }

  ngOnInit() {
    // moment.utc().format("YYYY-MM-DD_HH-mm-ss[Z]")
    if ((this.authService.currentUserValue.address == null || this.authService.currentUserValue.address == '') || (this.authService.currentUserValue.pin_code == null || this.authService.currentUserValue.pin_code == '')) {

      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/doctor/labeditprofile"])

    }
    else {

    }

    this.fetch((data) => {
      this.rows = data;
      // this.filteredData = rows;
    });
    this.dataSource3.paginator = this.paginator;


  }

  //   public fileChange(args: SelectedEventArgs): void {
  //     let totalSize: number = 0;
  //     for (let file of args.filesData) {
  //         totalSize = totalSize + file.size;
  //     }
  //     let size: string = this.uploadObj.bytesToSize(totalSize);
  //     alert("Total select file's size is " + size)
  // }

  fetch(_cb: (data: any) => void) {
    this.user_id = this.authService.currentUserValue.userid;
    // this.token = this.authService.currentUserValue.token;
    const data = { "lab_id": this.user_id, }
    this.patientServiceService.labList(data).subscribe(
      (result: any) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);

        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.sort;
      },

      (err) => {
        console.log(err);
      }
    );
  }

  async fileChange($event) {
    this.report_document = null;
    // if ($event && $event.length) {
    //   this.report_document = $event[0];
    // }

    if ($event && $event.length > 0) {
      // Don't allow file sizes over 1MB
      if ($event[0].size < this.MAX_SIZE) {
        // Set theFile property
        this.report_document = $event[0];
      }
      else {
        // Display error message
        this.messages.push("File " + $event[0].name + " is too large to upload. File size should be upto 5 MB.");
      }
    }
    // let totalSize: number = 0;
    // for (let file of $event.report_document) {
    //     totalSize = totalSize + file.size;
    // }
    // let size: string = this.uploadObj.bytesToSize(totalSize);
    // alert("Total select file's size is " + size)

  }

  removeData() {
    this.messages = [];
    if (this.uploadFileForm.valid) {
      this.uploadFileForm.reset();
    }
  }

  onSubmit(_data: {}) {
    //Add-report-api

console.log(this.report_document);

if(this.report_document==null || this.report_document=='undefined'){

  Swal.fire(
    '',
    'Upload Report Is Required',
    'error'
  )
}
else{
  this.loading = true;
  this.form = new FormData();
  this.form.append('visit_id', this.visit_id);
  this.form.append('report_document', this.report_document);
  this.form.append('type', '1');
  // console.log('File size', this.report_document.size);
  // alert("Total select file's size is " + this.report_document.size)
  this.patientServiceService.addReport(this.form).subscribe(
    (result: any) => {
      if (this.uploadFileForm.valid) {
        this.uploadFileForm.reset();
      }

      // if(result.message == 'success'){
      //   this.showBtn == false;

      // } else {
      //   this.showBtn == true;
      // }

      // console.log(result);
      if (result.status_code == 200) {
        // setTimeout(() => {
        //   const currentUrl = this.router.url;
        //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //     this.router.navigate([currentUrl]);
        //   });
        // }, 1000);
        setTimeout(() => {
          // const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            window.location.reload();

          });
        }, 1000);

      }

      Swal.fire(
        '',
        result.message,
        'success'
      )
    },

    (err) => {
      // this.showBtn == true;
      console.log(err);
      Swal.fire(
        '',
        err,
        'error'
      )
    }
  );
}
    
  }

  returnPdf(image) {
    if (image != '-') {
      this.htmlReturn = '<img src="assets/images/pdf.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  //View File
  viewFile(image) {
    if (image !== '-') {
      this.htmlReturn = '<i class="fa fa-eye file-style col-blue font-20"></i>';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  dateFormate(date_formate) {
    var date_Data = new Date(date_formate.substring(0, 10));
    return date_Data;
  }



  editRow(row, rowIndex, content, visit_id) {
    this.visit_id = visit_id;
    this.uploadFileForm.reset();
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
    });
  }

  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id == form.value.id) {
        value.firstName = form.value.firstName;
      }
      this.modalService.dismissAll();
      return true;
    });
  }

  validateFileType($event) {

    var idxDot = $event[0].name.lastIndexOf(".") + 1;
    var extFile = $event[0].name.substr(idxDot, $event[0].name.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "pdf") {
      this.fileTypeCheck = false;
    } else {
      this.fileTypeCheck = true;
      Swal.fire(
        '',
        'Only jpg/jpeg , png  and pdf files are allowed!',
        'error'
      )
    }
  }
}