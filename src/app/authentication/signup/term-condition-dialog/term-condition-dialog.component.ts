import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-term-condition-dialog',
  templateUrl: './term-condition-dialog.component.html',
  styleUrls: ['./term-condition-dialog.component.sass']
})
export class TermConditionDialogComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }


}
