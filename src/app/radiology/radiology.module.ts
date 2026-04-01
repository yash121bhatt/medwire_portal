import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiologyRoutingModule } from './radiology-routing.module';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { ComponentsModule } from '../shared/components/components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { RadiologyVisitsComponent } from './radiology-visits/radiology-visits.component';
import { NewVisitComponent } from './new-visit/new-visit.component';
import { UploadBulkReportComponent } from './upload-bulk-report/upload-bulk-report.component';
import { UploadBulkReportService } from './upload-bulk-report/upload-bulk-report.service';
import { RadiomyprofileComponent } from './radiomyprofile/radiomyprofile.component';
import { RadioeditprofileComponent } from './radioeditprofile/radioeditprofile.component';
import { PatientListStepComponent } from './patient-list-step/patient-list-step.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { EditBankDetailComponent } from './edit-bank-detail/edit-bank-detail.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DoctorManagementComponent } from './doctor-management/doctor-management.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlanListComponent } from './plan-list/plan-list.component';
import { NgxCalendarModule } from "ss-ngx-calendar";
import { PlanPurchaseHistoryComponent } from './plan-purchase-history/plan-purchase-history.component';
import { InslightMonitoringListComponent } from './inslight-monitoring-list/inslight-monitoring-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    RadiologyVisitsComponent,
    NewVisitComponent,
    UploadBulkReportComponent,
    RadiomyprofileComponent,
    RadioeditprofileComponent,
    PatientListStepComponent,
    EditBankDetailComponent,
    BillingHistoryComponent,
    DoctorManagementComponent,
    NotificationListComponent,
    PlanListComponent,
    PlanPurchaseHistoryComponent,
    InslightMonitoringListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    RadiologyRoutingModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    DragDropModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
    MatStepperModule,
    MaterialFileInputModule,
    NgxMaterialTimepickerModule,
    MatTableExporterModule,
    NgxPaginationModule,
    NgxCalendarModule
  ],
  providers: [ UploadBulkReportService],
})
export class RadiologyModule { }
