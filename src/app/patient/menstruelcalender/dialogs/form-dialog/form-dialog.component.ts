import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { MenstruelcalenderService } from "../../menstruelcalender.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Calendar } from "../../calendar.model";
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { id } from "@swimlane/ngx-datatable";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common'


@Component({
  providers: [DatePipe],
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  eventClickData: string;
  deleteID: any;
  dateD: Date;
  maxDate = new Date();
  avgm_cycle:boolean  =true;
  title_show: boolean;
  titleTextdisplay: string;
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: MenstruelcalenderService,
    private fb: FormBuilder,
    private patientdataService : PatientdataService,
    private authService: AuthService,
    private router: Router,
    public datepipe: DatePipe
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action === "edit") {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = false;
      this.avgm_cycle = false;
      this.title_show = true;
      this.titleTextdisplay = this.calendar.title;
    } else if(this.action === "addFirst"){
      this.dialogTitle = "New Event";
      this.calendar = new Calendar({});
      this.showDeleteBtn = false;
      this.avgm_cycle = true;
      this.title_show = false;
    } else {
      this.dialogTitle = "New Event";
      this.calendar = new Calendar({});
      this.showDeleteBtn = false;
      this.avgm_cycle = false;
      this.title_show = false;
    }

    this.calendarForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      // title: [this.calendar.title, [Validators.required]],
      startDate: [this.data.start_datePick??new Date(), [Validators.required]],
      // endDate: [this.calendar.endDate, [Validators.required]],
     // colorpick: [this.calendar.colorpick, [Validators.required]],
      average_period:[null],
      average_period_cycle : [null, [Validators.required]],
      submit_type : [null]
    });
  }
  submit(data) {
    
    if(this.action == 'addFirst'){
     var startDDate = data.startDate;
    var modifiedDate = startDDate.toString().slice(4,15);


      console.log(new Date(modifiedDate).toISOString());

      console.log('START DATE',startDDate.toString().slice(4,15));
      console.log('Latest date',this.datepipe.transform(modifiedDate, 'yyyy-MM-dd'))


      const mensurationData = {
        "user_id":this.authService.currentUserValue.userid,
        "start_date":this.datepipe.transform(modifiedDate, 'yyyy-MM-dd'),
        "nextDays":data.average_period,
        "bg_color_class":'fc-event-danger',
        "period_length"  : data.average_period_cycle
      }
      this.patientdataService.mensurationAddsecond(mensurationData).subscribe(
      (result) => {
        if(result.status_code===200){

           this.dialogRef.close();
          Swal.fire(
            '',
            result.message,
            'success'
          )
          setTimeout(() => {
            this.router.navigate(["/patient/menstruelcalender"]).then(() => {
              window.location.reload();
            });
          }, 1000);
        }
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
      }
    )
    }

    if(this.action == 'add'){

      const mensurationData = {
        "user_id":this.authService.currentUserValue.userid,
        "start_date":data.startDate,
        "nextDays":data.average_period,
        "bg_color_class":data.colorpick
       
    }
   
    this.patientdataService.mensurationAdd(mensurationData).subscribe(
      (result) => {
        if(result.status_code===200){
         
           this.dialogRef.close();
          Swal.fire(
            '',
            result.message,
            'success'
          )
          setTimeout(() => {
            this.router.navigate(["/patient/menstruelcalender"]).then(() => {
              window.location.reload();
            });
          }, 2200);
        }
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
      }
    )
    }

    if(this.action == 'edit'){
      
    this.eventClickData =JSON.stringify(this.calendarForm.getRawValue(),["id"]);
    this.deleteID = JSON.parse(this.eventClickData);

   // console.log(this.deleteID.split(' '))
    var str = this.deleteID;
    var ID = new Array();
    ID = this.deleteID.id.match(/\d+/g);
 
    const mensurationDatae = {
      "m_id":ID[0],
      "user_id":this.authService.currentUserValue.userid,
      "title":data.title,
      "start_date": this.dateD,
    //  "end_date":data.endDate,
      "bg_color_class":data.colorpick     
            }
    
    this.patientdataService.mensurationUpdate(mensurationDatae).subscribe(
      (result) => {
        if(result.status_code===200){
          this.dialogRef.close();
          Swal.fire(
            '',
            result.message,
            'success'
          )
          setTimeout(() => {
            this.router.navigate(["/patient/menstruelcalender"]).then(() => {
              window.location.reload();
            });
          }, 2200);
        }
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
      }
    )

    }
   
  }
  deleteEvent() {
    this.eventClickData =JSON.stringify(this.calendarForm.getRawValue(),["id"]);
    this.deleteID = JSON.parse(this.eventClickData);

   // console.log(this.deleteID.split(' '))
    var str = this.deleteID;
    var ID = new Array();
    ID = this.deleteID.id.match(/\d+/g);
    const m_ID = {
           m_id : ID[0]
          }

  this.patientdataService.deleteMensuration(m_ID).subscribe(
    (result)=>{
      Swal.fire(
        '',
        result.message,
        'success'
      )
      setTimeout(() => {
        this.router.navigate(["/patient/menstruelcalender"]).then(() => {
          window.location.reload();
        });
      }, 2200);

      
    },
    (err)=>{
      Swal.fire(
        '',
        err,
        'error'
      )
    });

   // this.calendarService.deleteCalendar(this.calendarForm.getRawValue());

    this.dialogRef.close("delete");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close("submit");
  }

  confirmEdit(){
    
  }
}
