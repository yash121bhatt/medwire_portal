import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratory-user-list',
  templateUrl: './laboratory-user-list.component.html',
  styleUrls: ['./laboratory-user-list.component.sass']
})
export class LaboratoryUserListComponent implements OnInit {

  rows: any = [];

  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  newUserImg = "assets/images/user/patient.jpg";

  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [];
  imageURL = `${environment.documentUrl}`;

  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  user_id: any;
  token: string;
  data: any;
  result: any;
  dynamicArray: any;
  addprofile: boolean = false;
  member_id: any;
  temp: any[];
  date_of_birth: any = new Date();
  dateFormate: string;
  closeResult: string;
  error_message: boolean = false;
  error_message_text: string;
  // datePipe: DatePipe = new DatePipe('en-US');
  deleteId: number;
  showAge: any;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private authService: AuthService,
    private patientServiceService: PatientServiceService,
    private router : Router
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

    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
    });




  }
  ngOnInit(): void {
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
  }

  // getformattedDate(){

  //   const date_of_birth = new Date();
  //   const transformDate = this.datePipe.transform(this.date_of_birth, 'yyyy-MM-dd');
  //   return transformDate;

  // }


  // List-Data-Api
  fetch(_cb: (data: any) => void) {
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    this.patientServiceService.members(data).subscribe(
      (result: any) => {
        if (result.data.length >= 5) {
          this.addprofile = true;
        }
        this.rows = result.data;
      },

      (err) => {
        console.log(err);
      }
    );
  }

  deleteRow(member_id) {
    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      member_id: member_id,
      user_id: this.user_id
    };
    this.patientServiceService.deletemember(data)
      .subscribe(response => {
        Swal.fire(
          '',
          response.message,
          'success'
        )
        this.fetch(this.data);
      })
  }

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   const temp = this.rows.filter(function (d) {
  //     return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });

  //   // update the rows
  //   this.rows = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   this.table.offset = 0;
  // }

  // deleteRow(rows) {
  //   this.rows = this.arrayRemove(this.rows, rows.id);
  //   this.showNotification(
  //     "bg-red",
  //     "Delete Record Successfully",
  //     "top",
  //     "right"
  //   );
  // }
  // arrayRemove(array, id) {
  //   return array.filter(function (element) {
  //     return element.id != id;
  //   });
  // }

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
  getdeleteID(Id) {
    this.deleteId = Id;
  }
  deleteRecord() {

    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      member_id: this.deleteId,
      user_id: this.user_id
    };



    this.patientServiceService.deletemember(data).subscribe(
      (result) => {
        setTimeout(() => {
          this.fetch(this.data);
          //this.router.navigate(["/patient/lab-m-report/"+this.route.snapshot.paramMap.get('type')]);
          //this.ngOnInit();
        }, 300);
        Swal.fire(
          '',
          result.message,
          'error'
        )

        //this.ngOnInit();
        Swal.fire(
          '',
          result.message,
          'error'
        )

      },
      (err) => {
        this.error_message = true;
        this.error_message_text = err;
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