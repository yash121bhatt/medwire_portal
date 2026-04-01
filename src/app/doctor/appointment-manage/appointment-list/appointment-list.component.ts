import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogmodalComponent } from './dialogmodal/dialogmodal.component';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import  moment from 'moment';
import { DatePipe } from '@angular/common';


export interface PeriodicElement {
  no: number;
  medwire_id: string;
  patient_name: string,
  doctor_name: string,
  pincode: string,
  appointment_date: string,
  test_name: string,
  status: string,
  reason_reschedule: string,
  actions: any,
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  providers: [DatePipe],
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.sass']
})
export class AppointmentListComponent implements OnInit {
  calendarOptions = {};
  calendarEvents = [new Date()];
  calendarValue = null;
  rows: any;
  public resheduleForm: FormGroup;
  private form: FormData;
  approve_state: boolean;
  cancel_state: boolean;
  approved_id: number;
  closeResult: string;
  // report_document: any;
  appointmentDate: any;
  availableSlot: any;
  selectedSlot: any;
  visit_id: any;
  editForm: FormGroup;
  htmlReturn: string;
  uploadFileForm: FormGroup;
  appo_id: any;
  MAX_SIZE: number = 5242880;
  report_document: any = null;
  messages: string[] = [];
  startDate: any;
  loading: boolean;
  fileTypeCheck: boolean = false;
  // appointmentDate : any;

  showApproveDialog() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "<p><b>Appointment is Approved</b></p>",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  showCancelDialog() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "<p><b>Appointment is cancelled</b></p>",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  user_id: any;
  token: string;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "appointment_id",
    "medwire_id",
    "patient_name",
    "grand_total",
    "pin_code",
    "appointment_date",
    "test_name",
    "appointments_user_type",
    "payment_status",
    "appointment_status",
    "report_document",
    "reason_of_reschedule",
    "actions",
  ];

  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private fb: FormBuilder,
    private dialogModel: MatDialog,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe : DatePipe
  ) {

  }
  ngOnInit() {

    if ((this.authService.currentUserValue.address == null || this.authService.currentUserValue.address == '') || (this.authService.currentUserValue.pin_code == null || this.authService.currentUserValue.pin_code == '')) {

      Swal.fire(
        '',
        'Please, Complete Your Profile to run MedWire application Smoothly!',
        'info'
      )
      this.router.navigate(["/doctor/labeditprofile"])

    }
    else {

    }

    this.resheduleForm = this.fb.group({
      time_set: [""],
      reschedule: ["", [Validators.required]],
    });
    this.uploadFileForm = new FormGroup({
      report_document: new FormControl()
    });


    this.dataSource3.paginator = this.paginator;

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = {
      "user_id": this.user_id,
    }
    //console.log(this.user_id);

    this.patientServiceService.labAppointments(data).subscribe(
      (result: any) => {
        // console.log('abc',result.data[4].result[0].amount);
        this.rows = result.data;
        //console.log(this.rows);
        this.dataSource3 = new MatTableDataSource(this.rows);
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
        // this.dataSource3.sort = this.sort;
      },

      (err) => {
        console.log(err);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialogModel.open(DialogmodalComponent, {
      width: "980px",
      disableClose: true,
    });
  }

  conditionCheck(state) {
    if (state === 'Approve') {
      this.approve_state = false;
      this.cancel_state = true;
    }
    if (state === 'Cancelled') {
      this.approve_state = true;
      this.cancel_state = false;
    }
    if (state === 'Pending') {
      this.approve_state = true;
      this.cancel_state = true;
    }

  }

  approveLab(id: number) {
    this.approved_id = id;

  }
  disapproveLab(id: number) {
    this.approved_id = id;
  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDisapprove(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editRow(row, rowIndex, content, visit_id) {
    this.visit_id = visit_id;
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
    });
  }

  approvedRequest() {
    const data = {
      "appointment_id": this.approved_id,
      "status": "Approved",
    }
    //console.log('Appointment id', this.appointment_id);

    this.patientServiceService.approveAppointment(data).subscribe(
      (result) => {
        //console.log(result);
        if (result.status_code == 200) {
          setTimeout(() => {
            //  this.success_message= false;
            Swal.fire(
              '',
              result.message,
              'success'
            )
            //  this.router.navigate(["/admin/my-profile"]);
            const currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
            });
          }, 500);
        }
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )

      }
    )
  }
  appointment_id(arg0: string, appointment_id: any) {
    throw new Error("Method not implemented.");
  }
  rescheduleopen(content) {

    this.modalService.open(content, { size: <any>'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // disApprovedRequest() {
  //   const data = {
  //     "appointment_id": this.approved_id,
  //     "status": "Visited",
  //   }

  //   this.patientServiceService.approveAppointment(data).subscribe(
  //     (result) => {
  //       console.log(result);
  //       if (result.status_code == 200) {
  //         setTimeout(() => {
  //           //  this.success_message= false;
  //           Swal.fire(
  //             '',
  //             result.message,
  //             'success'
  //           )
  //           //  this.router.navigate(["/admin/my-profile"]);
  //           const currentUrl = this.router.url;
  //           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //             this.router.navigate([currentUrl]);
  //           });
  //         }, 500);
  //       }
  //     },
  //     (err) => {
  //       Swal.fire(
  //         '',
  //         err,
  //         'error'
  //       )

  //     }
  //   )
  // }

  visitedAppointment() {
    const appointmentData = {
      "appointment_id": this.approved_id,
      "status": "Visited"
    };

   // console.log('hit', appointmentData);

    this.patientServiceService.approveAppointment(appointmentData).subscribe(
      (result) => {
        Swal.fire(
          '',
          'Patient Arrived',
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

  getId(Id:number) {
    this.approved_id = Id;
  }

  disapprovedAppointment(){
    const appointmentData = {
      "appointment_id": this.approved_id,
      "status": "Cancelled"
    };

    //console.log('hit',appointmentData);

    this.patientServiceService.approveAppointment(appointmentData).subscribe(
      (result) => {
        Swal.fire(
          '',
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

  //Date time slot
  // setDate(date, e) {
  //   date === "start" ? (this.startDate = e) : (this.endDate = e);
  // }

  onChooseDate(e) {
    var startDDate = e.startDate;
    var modifiedDate = e.toString().slice(4,15);

    const data = {
      user_id: this.authService.currentUserValue.userid,
      appoin_date: this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z',
    }
    // console.log('-----Date', this.appointmentDate);
    

    this.patientServiceService.getlabSlot(data).subscribe(
      (result) => {

        this.availableSlot = result.data[0].Slots;
        //this.afternoonSlot = result.result.afternoonSlots;
        //this.eveningSlots = result.result.eveningSlots;

        if (result.dayStatus == 0) {
          // this.availableSlot =  [];
          // this.afternoonSlot =  [];
          // this.eveningSlots  =  [];

          // this.showslotMessage = true;
        }
        else {

        }
      },
      (err) => {

      }
    )
  }

  onSubmitClick() {
    let date1 = moment(this.appointmentDate).format("yyyy-MM-DD");
    const data = {
      time_slot: this.selectedSlot,
      appointment_date: date1,
      reason_of_reschedule: this.resheduleForm.value.reschedule,
      appointment_id: this.appo_id,
    }
    // console.log("Form Value", this.resheduleForm.value);

    this.patientServiceService.reschedulelabAppointment(data).subscribe(
      (result) => {
        Swal.fire(
          '',
          result.message,
          'success'
        )
        this.ngOnInit();
        // this.router.navigate(['/clinic/appointment/appointment-list']);
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
      }
    );
  }

  getdoctorId(appointment_id :any){
    this.appo_id = appointment_id
  }


  slotTimeselected(slot) {
    this.selectedSlot = slot;
  }

  async fileChange($event) {
    // this.report_document = null;
    // if ($event && $event.length) {
    //   this.report_document = $event[0];
    // }
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
  }

  removeData(){
    this.messages = [];
    if (this.uploadFileForm.valid) {
      this.uploadFileForm.reset();
    }
  }

  onSubmit(_data: {}) {
    //console.log('ABC');

    //Add-report-api

    if(this.report_document==null || this.report_document=='undefined'){

      Swal.fire(
        '',
        'Upload Report Is Required',
        'error'
      )
    }
    else{
      this.form = new FormData();
      this.form.append('visit_id', this.visit_id);
      this.form.append('report_document', this.report_document);
      this.form.append('type', '1');
      this.patientServiceService.addReport(this.form).subscribe(
        (result: any) => {
          //console.log(result);
          if (this.uploadFileForm.valid) {
            this.uploadFileForm.reset();
          }
          if (result.status_code == 200) {
            // setTimeout(() => {
            //   const currentUrl = this.router.url;
            //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            //     this.router.navigate([currentUrl]);
            //   });
            // }, 2000);
            setTimeout(() => {
              // const currentUrl = this.router.url;
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
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
