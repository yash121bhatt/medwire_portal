import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
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
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSliderModule} from '@angular/material/slider';
// import { ApexchartComponent } from "../charts/apexchart/apexchart.component";
import { ChartsModule  } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatExpansionModule } from "@angular/material/expansion";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatMenuModule } from "@angular/material/menu";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';



import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { PrescriptionTabsComponent } from './prescription-tabs/prescription-tabs.component';
import { AdviceTabComponent } from './advice-tab/advice-tab.component';
import { DiagnosticTabComponent } from './diagnostic-tab/diagnostic-tab.component';
import { DrugsTabComponent } from './drugs-tab/drugs-tab.component';
import { FollowUpTabComponent } from './follow-up-tab/follow-up-tab.component';
import { HealthstatusTabComponent } from './healthstatus-tab/healthstatus-tab.component';
import { HistoryTabComponent } from './history-tab/history-tab.component';
import { PrescribeTabComponent } from './prescribe-tab/prescribe-tab.component';


@NgModule({
  declarations: [
    PrescriptionTabsComponent,
    AdviceTabComponent,
    DiagnosticTabComponent,
    DrugsTabComponent,
    FollowUpTabComponent,
    HealthstatusTabComponent,
    HistoryTabComponent,
    PrescribeTabComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    PerfectScrollbarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),}),
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    NgbModule,
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
    chartjsModule,
    MatExpansionModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,
    MatSortModule,
    PrescriptionsRoutingModule
  ]
})
export class PrescriptionsModule { }
