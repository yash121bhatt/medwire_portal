import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MenstruelcalenderRoutingModule } from "./menstruelcalender-routing.module";
import { FullCalendarModule } from "@fullcalendar/angular";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { MenstruelcalenderComponent } from "./menstruelcalender.component";
import { FormDialogComponent as calFormComponent } from "./dialogs/form-dialog/form-dialog.component";
import { MenstruelcalenderService } from "./menstruelcalender.service";
import { ColorPickerModule } from 'ngx-color-picker';

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { ComponentsModule } from "../../shared/components/components.module";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);


@NgModule({
  declarations: [MenstruelcalenderComponent , calFormComponent],
  imports: [
    CommonModule,
    MenstruelcalenderRoutingModule,
    FormsModule,
    FullCalendarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatMenuModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    ColorPickerModule
  ],
  providers: [MenstruelcalenderService],
})
export class MenstruelcalenderModule { }
