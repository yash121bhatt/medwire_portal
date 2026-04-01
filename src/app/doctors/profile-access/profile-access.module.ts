import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from "ngx-echarts";
import { NgApexchartsModule } from "ng-apexcharts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SharedModule } from "../../shared/shared.module";
import {MatSliderModule} from '@angular/material/slider';
// import { ApexchartComponent } from "../charts/apexchart/apexchart.component";
import { ChartsModule  } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

import { ProfileAccessRoutingModule } from './profile-access-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientDocumentComponent } from './patient-document/patient-document.component';
import { PatientHealthstatusComponent } from './patient-healthstatus/patient-healthstatus.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { MensturalCalendarComponent } from './menstural-calendar/menstural-calendar.component';
import { FormDialogComponent as calFormComponent } from "./menstural-calendar/dialogs/form-dialog/form-dialog.component";
import { ColorPickerModule } from 'ngx-color-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { MenstruelcalenderService } from "./menstural-calendar/menstruelcalender.service";
import { PreNotificationComponent } from './pre-notification/pre-notification.component';
import { HealthGraphComponent } from './health-graph/health-graph.component';
import { HistoryNotepadComponent } from './history-notepad/history-notepad.component'

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    PatientListComponent,
    PatientFormComponent,
    StepOneComponent,
    StepTwoComponent,
    PatientProfileComponent,
    PatientDocumentComponent,
    PatientHealthstatusComponent,
    ProfileDashboardComponent,
    MensturalCalendarComponent,
    calFormComponent,
    PreNotificationComponent,
    HealthGraphComponent,
    HistoryNotepadComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatStepperModule,
    MatSliderModule,
    ChartsModule,
    NgxDatatableModule,
    MaterialFileInputModule,
    FullCalendarModule,
    MatExpansionModule,
    ProfileAccessRoutingModule,
    ColorPickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgApexchartsModule,
    NgxEchartsModule
  ],
  providers: [MenstruelcalenderService],
})
export class ProfileAccessModule { }
