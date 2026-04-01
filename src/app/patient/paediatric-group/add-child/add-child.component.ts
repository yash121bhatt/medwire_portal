import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';


interface Reportdoc {
  s_no: string | Number;
  baby_name: any;
  baby_gender:any;
  date_of_birth:any;
  age_count:any;
}

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.sass']
})
export class AddChildComponent implements OnInit {

  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [
  ];

  Report_doc: Reportdoc[];
  displayedColumns: string[] = [
    "s_no",
    "baby_name",
    "baby_gender",
    "age_count",
    "date_of_birth",
    "action",
  ];
  
  @ViewChild('empTbSort') empTbSort = new MatSort();
  deleteId: any;
  closeResult: string;
  error_message: boolean;
  error_message_text: any;
ngAfterViewInit() {
  this.dataSource3.sort = this.empTbSort;
}

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(null);
  //dataSource3 = new MatTableDataSource < OrdersDetailsDataSource > (null);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  selectedRowData: selectRowInterface;
  newUserImg = "assets/images/user/user1.jpg";
  
  // data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [ ];
  
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  data: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private route:ActivatedRoute,
    private authService:AuthService,
    private patientdataService:PatientdataService,
    private router:Router,
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
  ngOnInit() {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
    
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/patient/editprofile"]);

    }
    else{

    }
    
    // this.fetch((rows) => {
    //   this.rows = rows;
    //   this.filteredData = rows;
    // });
    this.register = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastName: [""],
      phone: ["", [Validators.required]],
      due_date: ["", [Validators.required]],
      birth_date: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [""],
    });

    const babyList = {
      "user_id" : this.authService.currentUserValue.userid
      }
  
      this.patientdataService.babyList(babyList).subscribe(
        (result)=>
        {
        
          this.Report_doc = result.data;  
          this.dataSource3 = new MatTableDataSource (result.data); //pass the array you want in the table
          this.dataSource3.sort = this.empTbSort;
          this.dataSource3.paginator = this.paginator;
        },
        (err)=>{
        console.log(err);  
        }
      );
  }
  
  fetch(cb) {
    const req = new XMLHttpRequest();
    // req.open("GET", "assets/data/adv-tbl-data.json");
    req.onload = () => {
      const rows = JSON.parse(req.response);
      cb(rows);
    };
    req.send();
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
  
  // deleteRow(row) {
  //   this.data = this.arrayRemove(this.data, row.id);
  //   this.showNotification(
  //     "bg-red",
  //     "Delete Record Successfully",
  //     "bottom",
  //     "right"
  //   );
  // }
  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id != id;
    });
  }
  ageCount(date_if_birth){
    const convertAge = new Date(date_if_birth);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
   return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
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

  dateFormate(date_formate){
    //.toLocaleDateString('es-GS')
    var today = new Date(date_formate).toString();
     today = today.split('G')[0];
    return today;
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

  open(content) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonn(reason)}`;
    });
  }
  getdeleteId(Id){
    this.deleteId= Id;
  }
  deleteRecord(){
    const deleteData = {
      "user_id":this.authService.currentUserValue.userid,
      "baby_id":this.deleteId
       
     };
  
     this.patientdataService.deletebaby(deleteData).subscribe(
      (result)=>{
  
        this.ngOnInit();
      },
      (err)=>{
        this.error_message= true;
        this.error_message_text=err;
      }
     );
  }

  private getDismissReasonn(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  encryptionData(id){
    return id;
  }
}


export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;

}
