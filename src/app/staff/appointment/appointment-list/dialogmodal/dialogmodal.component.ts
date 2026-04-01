import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: 'app-dialogmodal',
  templateUrl: './dialogmodal.component.html',
  styleUrls: ['./dialogmodal.component.sass']
})
export class DialogmodalComponent implements OnInit {
  calendarOptions = {};
  calendarEvents = [new Date()];
  calendarValue = null;
  public resheduleForm: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  public ngOnInit(): void {
    this.resheduleForm = this.fb.group({
      time_set: [""],
      reschedule: [ "", [Validators.required]],
      
    });
  }
  showResheduleDialog() {
    this.dialog.closeAll();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "<p><b>Appointment is Approved</b></p>",
      showConfirmButton: false,
      timer: 1500,
      
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogmodalComponent, {
      height: '350px'
    });

   
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {
    console.log("Form Value", this.resheduleForm.value);
  }
  onChooseDate(date: any) {
    this.calendarValue = date;
}
}
