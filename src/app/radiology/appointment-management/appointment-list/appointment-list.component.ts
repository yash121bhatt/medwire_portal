import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import  moment from 'moment';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
// import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-list.component';



export interface PeriodicElement {
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
const ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  providers: [DatePipe],
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.sass']
})
export class AppointmentlistComponent implements OnInit {
  sort: MatSort;
  user_id: any;
  token: string;
  approved_id: number;
  closeResult: string;
  appointment_id: any;
  editForm: any;
  data: any;
  private form: FormData;

  MAX_SIZE: number = 5242880;
  report_document: any = null;
  messages: string[] = [];
  visit_id: any;
  uploadFileForm: FormGroup;
  htmlReturn: string;
  dicomUrl = `${environment.dicomUrl}`;
  imageURL = `${environment.labDocumentUrl}`;
  availableSlot: any;
  selectedSlot: any;
  appointmentDate: any;
  appo_id: any;
  loading: boolean;
  fileTypeCheck: boolean = false;

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
  rows: [];
  public resheduleForm: FormGroup;
  approve_state: boolean = false;
  cancel_state: boolean = false;
  calendarOptions = {};
  calendarEvents = [new Date()];
  calendarValue = null;

  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }



  displayedColumns: string[] = [
    "no",
    "medwire_id",
    "patient_name",
    "grand_total",
    "pin_code",
    "appointment_date",
    "time_slot",
    "test_name",
    "appointments_user_type",
    "payment_status",
    "appointment_status",
    "reason_of_reschedule",
    "report_document",
    "actions",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(null);
  applyFilter(event: Event) {
    // console.log('events', event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private fb: FormBuilder,
    private dialogModel: MatDialog,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private datepipe : DatePipe

  ) { }


  ngOnInit() {
    if ((this.authService.currentUserValue.address == null || this.authService.currentUserValue.address == '') || (this.authService.currentUserValue.pin_code == null || this.authService.currentUserValue.pin_code == '')) {
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/radiology/radioeditprofile"])

    }
    else {

    }

    this.resheduleForm = this.fb.group({
      time_set: [""],
      reschedule: ["", [Validators.required]],

    });


    this.fetch((data) => {
      this.rows = data;
      // this.filteredData = rows;
    });
    this.dataSource3.paginator = this.paginator;

    this.uploadFileForm = new FormGroup({
      report_document: new FormControl()
    });
  }

  fetch(_cb: (data: any) => void) {
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
  }

  async fileChangeSize($event) {
    this.report_document = null;
    if ($event && $event.length) {
      this.report_document = $event[0];
    }

  }


  // onSubmit(_data: {}) {
  //   //Add-report-api

  //   this.form = new FormData();
  //   this.form.append('visit_id', this.visit_id);
  //   this.form.append('report_document', this.report_document);
  //   this.form.append('type', '2')
  //   console.log('visit id',this.visit_id);

  //   this.patientServiceService.addReport(this.form).subscribe(
  //     (result: any) => {
  //       // console.log(result);
  //       if (result.status_code == 200) {
  //         setTimeout(() => {
  //           const currentUrl = this.router.url;
  //           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //             this.router.navigate([currentUrl]);
  //           });
  //         }, 2000);

  //       }

  //       Swal.fire(
  //         '',
  //         'Report Added Successfully',
  //         'success'
  //       )
  //     },

  //     (err) => {
  //       Swal.fire(
  //         '',
  //         err,
  //         'error'
  //       )
  //     }
  //   );
  // }

  onSubmit(_data: {}) {
    //console.log('ABC');
    //Add-report-api
    if(this.report_document==null || this.report_document=='undefined'){
      Swal.fire(
        '',
        'Upload Report Is Required',
        'error'
      )
    }else{
      this.loading = true;
      this.form = new FormData();
      this.form.append('visit_id', this.visit_id);
      this.form.append('report_document', this.report_document);
      this.form.append('type', '2');
      this.patientServiceService.addReport(this.form).subscribe(
        (result: any) => {
          //console.log(result);
          if (this.uploadFileForm.valid) {
            this.uploadFileForm.reset();
          }
          if (result.status_code == 200) {
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

  removeData() {
    this.messages = [];
    if (this.uploadFileForm.valid) {
      this.uploadFileForm.reset();
    }
  }

  onSubmitPdf(_data: {}) {
    //console.log('ABC');
    //Add-report-api

    if(this.report_document==null || this.report_document=='undefined'){
      Swal.fire(
        '',
        'Upload Report Is Required',
        'error'
      )
    }else{
      this.loading = true;
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

  finalDatareturn(data, i) {
    if (data[i].testData.length > 0) {

      // console.log('fd', data[i].cart_item);
      return data[i].cart_item[0].test_name ?? '-';
    }
    else {
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  visitedAppointment() {
    const data = {
      "appointment_id": this.approved_id,
      "status": "Visited",
    }

    this.patientServiceService.approveAppointment(data).subscribe(
      (result) => {
        //console.log(result);
        if (result.status_code == 200) {
          setTimeout(() => {
            //  this.success_message= false;
            Swal.fire(
              '',
              "Patient Arrived",
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

  editRow(row, rowIndex, content, visit_id) {
    this.visit_id = visit_id;
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

  changeLabId(id) {
    return atob(id);
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

  //Report DICOM File
  returnPdf(image) {
    if (image !== '-') {
      this.htmlReturn = '<img src="assets/images/pdf.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  //View File
  viewDicomFile(image) {
    if (image !== '-') {
      this.htmlReturn = '<i class="fa fa-eye file-style col-blue font-20"></i>';
    }
    else {
      this.htmlReturn = '-';
    }
  }
  //Report Redirect
  viewReport(fn: string) {
    if (fn !== '-') {
      localStorage.setItem('dicomFile', fn);
      if (localStorage.getItem('dicomFile')) {
        window.open(this.dicomUrl + '#' + fn, "_blank");
      }
    }
    else {
      return false;
    }
  }

  rescheduleopen(content) {

    this.modalService.open(content, { size: <any>'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onChooseDate(e) {
    // this.calendarValue = date;
    // this.appointmentDate = date._d.toString().slice(4, 15)
    // this.calendarValue = e;
    // this.appointmentDate = e._d;
    // let date = e._d.toString().slice(4, 15)

    var startDDate = e.startDate;
    var modifiedDate = e.toString().slice(4,15);

    const data = {
      user_id: this.authService.currentUserValue.userid,
      appoin_date: this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z',
    }

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


  slotTimeselected(slot) {
    this.selectedSlot = slot;
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


  getdoctorId(appointment_id: any) {
    this.appo_id = appointment_id
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

  validateFileTypeDicom($event) {
    let idxDot = $event[0].name.lastIndexOf(".") + 1;
    let extFile = $event[0].name.substr(idxDot, $event[0].name.length).toLowerCase();
    if (extFile == "DCM" || extFile == "zip") {
      this.fileTypeCheck = false;
    } else {
      this.fileTypeCheck = true;
      Swal.fire(
        '',
        'Only zip & DCM files are allowed!',
        'error'
      )
    }
  }


}