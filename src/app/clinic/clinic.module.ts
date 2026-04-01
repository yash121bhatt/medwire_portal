import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatSliderModule} from '@angular/material/slider';
import { ChartsModule  } from "ng2-charts";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);
import { MatStepperModule } from "@angular/material/stepper";
import { SharedModule } from '../shared/shared.module';
import { MaterialFileInputModule } from "ngx-material-file-input";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ClinicRoutingModule } from './clinic-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicMyprofileComponent } from './clinic-myprofile/clinic-myprofile.component';
import { ClinicEditmyprofileComponent } from './clinic-editmyprofile/clinic-editmyprofile.component';
import { InsightsComponent } from './insights/insights.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanPurchaseHistoryComponent } from './plan-purchase-history/plan-purchase-history.component';
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { InsightMonitoringListComponent } from './insight-monitoring-list/insight-monitoring-list.component';


@NgModule({
  declarations: [
  
    DashboardComponent,
       ClinicMyprofileComponent,
       ClinicEditmyprofileComponent,
       InsightsComponent,
       BankDetailComponent,
       NotificationListComponent,
       PlanListComponent,
       PlanPurchaseHistoryComponent,
       BillingHistoryComponent,
       InsightMonitoringListComponent
  ],
  imports: [
    CommonModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
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
    MatDialogModule,
    CommonModule,
    ClinicRoutingModule,
    NgxPaginationModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    NgxMaterialTimepickerModule

  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },         
  { provide: LOCALE_ID, useValue: "en-GB" } ],
})
export class ClinicModule { }
