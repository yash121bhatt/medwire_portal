import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
// import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from '@angular/material/slider';
import { ChartsModule } from "ng2-charts";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule }  from '@angular/material/sort';

import { PregnantWomanRoutingModule } from './pregnant-woman-routing.module';
import { PatientRoutingModule } from '../patient-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TablesRoutingModule } from 'src/app/tables/tables-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { PregnentWomenListComponent } from './pregnent-women-list/pregnent-women-list.component';
import { SafeTabletsListComponent } from './safe-tablets-list/safe-tablets-list.component';
import { ContraindicatedtabletComponent } from './contraindicatedtablet/contraindicatedtablet.component';


@NgModule({
  declarations: [
    PregnentWomenListComponent,
    SafeTabletsListComponent,
    ContraindicatedtabletComponent
  ],
  imports: [
    CommonModule,
    PregnantWomanRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    PatientRoutingModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    ComponentsModule,
    TablesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialFileInputModule,
    CKEditorModule,
    MatStepperModule,
    MatSliderModule,
    ChartsModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    NgxPaginationModule,
    MatMenuModule
  ]
})
export class PregnantWomanModule { }
