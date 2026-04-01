import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.sass']
})
export class TimeIntervalComponent implements OnInit {

  public addCusForm: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      time_set: [ "", [Validators.required],
      ],
      
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {
    console.log("Form Value", this.addCusForm.value);
  }

}
