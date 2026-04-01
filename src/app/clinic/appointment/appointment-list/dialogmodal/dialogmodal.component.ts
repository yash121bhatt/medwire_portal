import { Component, OnInit,Inject,ViewChild } from "@angular/core";
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { AuthService } from "src/app/core/service/auth.service";
import { PatientdataService } from "src/app/services/patientdata.service";
import { ClinicServiceService } from "src/app/services/clinic-service.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-dialogmodal',
  templateUrl: './dialogmodal.component.html',
  styleUrls: ['./dialogmodal.component.sass'],


})
export class DialogmodalComponent implements OnInit {

  calendarOptions = {};
  calendarEvents = [new Date()];
  calendarValue = null;
  minDate = new Date();
  public resheduleForm: FormGroup;
  availableSlot: any ;
  showslotMessage: boolean = false;
  selectedSlot: any;
  appointmentDate: any;
  eveningSlots: any;
  afternoonSlot: any;


  constructor
  (
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService :AuthService,
    private patientdataService : PatientdataService,
    private clinicServiceService : ClinicServiceService,
    private router : Router,
         ) {

     }
  public ngOnInit(): void {
    console.log('final',this.data);
    this.resheduleForm = this.fb.group({
      time_set: [""],
      reschedule: [ "", [Validators.required]],
      
    });

    const data ={
      doctor_id : this.data.doctor_id,
      date : new Date().toString().slice(4,15)
    }
   
    this.patientdataService.getavailableSlot(data).subscribe(
      (result)=>{
        
          this.availableSlot = result.result.morningSlots;
          this.eveningSlots = result.result.eveningSlots;

          if(result.result.length > 0){
           
              this.showslotMessage = false;
          }
          else{
            this.availableSlot = [];
            this.eveningSlots = [];
            this.showslotMessage = true;
          }
      },
      (err)=>{

      }
    )

  }
  showResheduleDialog() {
    this.dialog.closeAll();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "<p><b>Appointment is Approved</b></p>",
      showConfirmButton: false,
      timer: 3600,
      
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogmodalComponent, {
      height: '350px'
    });

   
  }
  closeDialog(): void {
    this.dialog.closeAll();
   // this.router.navigateByUrl("/clinic/appointment/appointment-list");

//    this.appointmentListComponent.ngOnInit();
  }
  onSubmitClick() {

    const data ={
      time_slot:this.selectedSlot,
      appointment_date:this.appointmentDate,
      reason_of_reschedule:this.resheduleForm.value.reschedule,
      appointment_id:this.data.appointment_id,
    }
   // console.log("Form Value", this.resheduleForm.value);

   this.clinicServiceService.rescheduledoctorAppointment(data).subscribe(
    (result)=>{
      Swal.fire(
        '',
        result.message,
        'success'
      )
      this.closeDialog();
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
  onChooseDate(date: any) {
    this.calendarValue = date;
    this.appointmentDate = date._d.toString().slice(4,15)

    const data ={
      doctor_id : this.data.doctor_id,
      date : date._d.toString().slice(4,15)
    }
   
    this.patientdataService.getavailableSlot(data).subscribe(
      (result)=>{
          this.availableSlot =  result.result.morningSlots;
          this.afternoonSlot = result.result.afternoonSlots;
          this.eveningSlots = result.result.eveningSlots;

          if(result.dayStatus ==0){
            this.availableSlot =  [];
            this.afternoonSlot =  [];
            this.eveningSlots  =  [];

              this.showslotMessage = true;
          }
          else{
               if(result.result.morningSlots.length ==0 && result.result.afternoonSlots.length ==0 && result.result.eveningSlots==0 ){
                this.availableSlot =  [];
                this.afternoonSlot =  [];
                this.eveningSlots  =  [];

              this.showslotMessage = true;
               }
              this.showslotMessage =false;
          }
      },
      (err)=>{

      }
    )
}

slotTimeselected(slot){
  this.selectedSlot = slot;
}
}
