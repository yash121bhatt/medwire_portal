import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogmodalComponent } from './dialogmodal/dialogmodal.component';
import { AuthService } from "src/app/core/service/auth.service";
import { ClinicServiceService } from "src/app/services/clinic-service.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PatientdataService } from "src/app/services/patientdata.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";



export interface PeriodicElement {
  no: number;
  medwire_id: string;
  patient_name: string,
  doctor_name: string,
  pincode: string,
  appointment_date: string,
  disease: string,
  status: string,
  reason_reschedule: string,
  appointments_user_type:any,
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
  appointmentID: number;
  public resheduleForm: FormGroup;
  availableSlot: any ;
  appointmentDate: any;
  eveningSlots: any;
  afternoonSlot: any;
  showslotMessage: boolean = false;
  doctorID: any;
  selectedSlot: any;
  appo_id: any;


  showCancelDialog() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "<p><b>Appointment is cancelled</b></p>",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  closeResult: string;
  deleteId: number;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "appointment_id",
    "permanent_id",
    "patient_name",
    "pin_code",
    "appointment_date",
    "reason",
    "payment_status",
    "status",
    "reason_of_reschedule",
    "appointments_user_type",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private fb: FormBuilder,
    private dialogModel: MatDialog,
    private authService : AuthService,
    private clinicServiceService : ClinicServiceService,
    private modalService: NgbModal,
    private patientdataService : PatientdataService,
    private router : Router,
    private datepipe : DatePipe
    ) {

    }
  ngOnInit() {

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/clinic/clinic-editmyprofile"]);

    }
    else{

    }

    this.resheduleForm = this.fb.group({
      time_set: [""],
      reschedule: [ "", [Validators.required]],
      
    });

    this.dataSource3.paginator = this.paginator;
     const data ={
      user_id : this.authService.currentUserValue.userid
     }

     this.clinicServiceService.clinicAppointment(data).subscribe(
      (result)=>{
       //this.dataSource3 = result.data;
       this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
       this.dataSource3.sort = this.empTbSort;
       this.dataSource3.paginator = this.paginator;
      },
      (err)=>{

      }
     );
  }
  openDialog(doctorID,appointmentId): void {
    const dataID ={
      appointment_id : appointmentId,
      doctor_id      : doctorID,
      clinic_id      : this.authService.currentUserValue.userid
    }
    const dialogRef = this.dialogModel.open(DialogmodalComponent, {
      width: "980px",
      disableClose: true,
      data : dataID
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

  rescheduleopen(content) {

    this.modalService.open(content, { size: <any>'xl' }).result.then((result) => {
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

  approvedAppointment(){
    const appointmentData = {
      "appointment_id": this.appointmentID,
      "status": "Approved"
    };
   

    this.clinicServiceService.appointmenStatusupdate(appointmentData).subscribe(
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

  disapprovedAppointment(){
    const appointmentData = {
      "appointment_id": this.appointmentID,
      "status": "Cancelled"
    };


    this.clinicServiceService.appointmenStatusupdate(appointmentData).subscribe(
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

  visitedAppointment(){
    const appointmentData = {
      "appointment_id": this.appointmentID,
      "status": "Visited"
    };

    // console.log('hit',appointmentData);

    this.clinicServiceService.appointmenStatusupdate(appointmentData).subscribe(
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

  convertReason(data:any){
    return JSON.parse(data);
  }

  checkActioncondition(data:any){
    if(data=="Completed"){
      return false;
    }
    else{
      return true;
    }
  }

  onChooseDate(date: any) {
   // this.calendarValue = date;
   
   
    var startDDate = date.startDate;
    var modifiedDate = date.toString().slice(4,15);

    this.appointmentDate = this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z';

    const data ={
      doctor_id : this.doctorID,
      clinic_id: this.authService.currentUserValue.userid,
      date : this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z',
    }
   
    this.patientdataService.getavailableSlot(data).subscribe(
      (result)=>{
          // this.availableSlot =  result.result.morningSlots;
          // this.afternoonSlot = result.result.afternoonSlots;
          // this.eveningSlots = result.result.eveningSlots;

          // if(result.dayStatus ==0){
          //   this.availableSlot =  [];
          //   this.afternoonSlot =  [];
          //   this.eveningSlots  =  [];

          //     this.showslotMessage = true;
          // }
          // else{
          //      if(result.result.morningSlots.length ==0 && result.result.afternoonSlots.length ==0 && result.result.eveningSlots==0 ){
          //       this.availableSlot =  [];
          //       this.afternoonSlot =  [];
          //       this.eveningSlots  =  [];

          //     this.showslotMessage = true;
          //      }
          //     this.showslotMessage =false;
          // }


          if(result.result){
            this.availableSlot= result.result.morningSlots;
            this.afternoonSlot=result.result.afternoonSlots;
            this.eveningSlots =result.result.eveningSlots;
            let dayStatus = result.result.dayStatus;
            let availability = result.result.availability;
            if(availability.length > 0){
              if(availability[0].morning_shift_status == 1){
                this.availableSlot= [];
              }
              if(availability[0].afternoon_shift_status == 1){
                this.afternoonSlot= [];
              }
              if(availability[0].evening_shift_status == 1){
                this.eveningSlots= [];
              }
              if(availability[0].morning_shift_status == 1 && availability[0].afternoon_shift_status == 1 && availability[0].evening_shift_status == 1){
                this.availableSlot= [];
                this.afternoonSlot=[];
                this.eveningSlots =[];
                this.showslotMessage = true;
              }
            }
            if(dayStatus == "0"){
              this.availableSlot= [];
              this.afternoonSlot=[];
              this.eveningSlots =[];
              this.showslotMessage = true;
  
            }else{
               if(this.availableSlot.length == 0 && this.afternoonSlot.length == 0 && this.eveningSlots.length == 0){
                this.showslotMessage = true;
               }
               else{
                this.showslotMessage = false;
               }
            }
        }else{
          this.showslotMessage = true;
        }
      },
      (err)=>{

      }
    )
}

getdoctorId(id :any,appointment_id){
  this.doctorID = id ;
  this.appo_id = appointment_id
}


onSubmitClick() {

  const data ={
    time_slot:this.selectedSlot,
    appointment_date:this.appointmentDate,
    reason_of_reschedule:this.resheduleForm.value.reschedule,
    appointment_id: this.appointmentID,
  }


 this.clinicServiceService.rescheduledoctorAppointment(data).subscribe(
  (result)=>{
    this.availableSlot =  [];
    this.afternoonSlot =  [];
    this.eveningSlots  =  [];
    Swal.fire(
      '',
      result.message,
      'success'
    )
    this.ngOnInit();
    // this.router.navigate(['/clinic/appointment/appointment-list']);
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


slotTimeselected(slot){
  this.selectedSlot = slot;
}
}
