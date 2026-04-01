import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

// import { MatFormFieldControl } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


interface Reportdoc {
  s_no: string | Number;
  duration: any;
  due_date:any;
  dose_date : any;

}

@Component({
  selector: 'app-vaccination-schedule',
  templateUrl: './vaccination-schedule.component.html',
  styleUrls: ['./vaccination-schedule.component.sass'],
 
})
export class VaccinationScheduleComponent implements OnInit {
  


  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [
    { 
      "duration": "2 Weeks",
      "duedate": "05-07-2021",
      "dosedate": "15-07-2021",
    },
    { 
      "duration": "5 Weeks",
      "duedate": "05-07-2021",
      "dosedate": "15-07-2021",
    },
    { 
      "duration": "1 Month",
      "duedate": "05-07-2021",
      "dosedate": "15-07-2021",
    },
    { 
      "duration": "1.5 Months",
      "duedate": "05-07-2021",
      "dosedate": "15-07-2021",
    },
    { 
      "duration": "2 Months",
      "duedate": "05-07-2021",
      "dosedate": "15-07-2021",
    },
    { 
      "duration": "2.5 Months",
      "duedate": "05-07-2021",
      "dosedate": "15-07-2021",
    },
  ];
  selectedRowData: selectRowInterface;
  newUserImg = "assets/images/user/user1.jpg";
  
   Reportdoc =[
    {
   "s_no" : 1,
   "duration": "Birth",
   "due_date":"10/08/2022",
   "dose_date" : "12/08/2022",
    }
  ];
  displayedColumns: string[] = [
    "s_no",
    "duration",
    "vaccination_name",
    "due_date",
    "dose_date",
    "action",
  ];
  
  // data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  labreportForm : FormGroup;
  selectedOption: string;
  columns = [ ];
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  closeResult: string;
  deleteId: number;
  maxDate =new Date();
  submitted = false;
  popModal = true;
  
  
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  data: any;
  baby_id: any;
  time_duration: any;
  v_id: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private authService:AuthService,
    private route:ActivatedRoute,
    private patientdataService:PatientdataService,
    private dialog: MatDialog,
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
    this.labreportForm = this.fb.group({
      // id: new FormControl(),
      // duration: new FormControl(),
      duration: [""],
      dose_date: new FormControl(),
      date: new FormControl(),
    });
  }

  
  onMarkasDone(event:any) {
    event.checked = true || false;
  }

  @ViewChild('empTbSort') empTbSort = new MatSort();
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
  editRow(row, rowIndex, content ,baby_id,time_duration ) {
    this.v_id = baby_id;
    this.time_duration = time_duration;
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
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
getIde(Id){
  this.deleteId= Id;
}
deleteRecord(){
  const deleteData = {
    "health_report_id":this.deleteId,
    "member_id":this.route.snapshot.paramMap.get('type'),
    "user_id":this.authService.currentUserValue.userid
     
   };

   this.patientdataService.deleteHealth(deleteData).subscribe(
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
      
     // this.error_message= true;
     // this.error_message_text=err;
    }
   );
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


  ngOnInit() {
    const data = {
      "baby_id": this.route.snapshot.paramMap.get('type'),
    };
    this.patientdataService.babyVaccinationchart(data).subscribe(
      (result: any) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);
        this.dataSource3.paginator = this.paginator;
      },

      (err) => {
        console.log(err);
      }
    );
    
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
  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id == form.value.id) {
        value.firstName   = form.value.firstName;
        value.lastName    = form.value.lastName;
        value.phone       = form.value.phone;
        value.gender      = form.value.gender;
        value.email       = form.value.email;
        value.address     = form.value.address;
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

  editNewEvent() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar:'',
        action: "add",
      },
      direction: tempDirection,
    });

    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === "submit") {
    //     this.calendarData = this.calendarService.getDialogData();
    //     console.log(this.calendarData.startDate);
    //     this.calendarEvents = this.calendarEvents.concat({
    //       // add new event data. must create new array
    //       id: this.calendarData.id,
    //       title: this.calendarData.title,
    //       start: this.calendarData.startDate,
    //       end: this.calendarData.endDate,
    //       className: this.getClassNameValue(this.calendarData.category),
    //       details: this.calendarData.details,
    //     });
    //     this.calendarOptions.events = this.calendarEvents;
    //     this.addCusForm.reset();
    //     this.showNotification(
    //       "snackbar-success",
    //       "Add Record Successfully...!!!",
    //       "bottom",
    //       "center"
    //     );
    //   }
    // });
  }

  onSubmit(data){
    let element:HTMLElement = document.getElementById('modal_closeBtn') as HTMLElement;
    this.submitted = true
    if (this.labreportForm.invalid) {
      return;
    } else {
      const babyData = {
        "v_id" : this.v_id,
        "baby_id" :this.route.snapshot.paramMap.get('type'),
        "dose_date" : data.dose_date,
        "status" : "Complete"
       }
       
       this.patientdataService.babyVaccinationupdate(babyData).subscribe(
        (result)=>{
          element.click();
          this.ngOnInit();
          Swal.fire(
            '',
            'Updated successfully',
            'success'
          )
       

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
}

export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;

}