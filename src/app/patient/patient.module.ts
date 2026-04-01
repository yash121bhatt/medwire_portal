import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { PatientRoutingModule } from "./patient-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrescriptionsComponent } from "./prescriptions/prescriptions.component";
import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
import { BillingComponent } from "./billing/billing.component";
import { SettingsComponent } from "./settings/settings.component";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { AddBmiComponent } from './add-bmi/add-bmi.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { ProfilesComponent } from "./profiles/profiles.component";
import { AddProfileComponent } from './add-profile/add-profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatSliderModule} from '@angular/material/slider';
import { ChartsModule  } from "ng2-charts";
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from "ng-pick-datetime";
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";


import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);
import { SharedModule } from '../shared/shared.module';
import { MaterialFileInputModule } from "ngx-material-file-input";
import { EditUserComponent } from './edit-user/edit-user.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileComponent } from './profile/profile.component';
import { PastmedicalhistoryComponent } from './pastmedicalhistory/pastmedicalhistory.component';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { PastsurgicalhistoryComponent } from './pastsurgicalhistory/pastsurgicalhistory.component';
import { HealthdairyComponent } from './healthdairy/healthdairy.component';
import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { PnancysymptomcheckComponent } from './pnancysymptomcheck/pnancysymptomcheck.component';
import { MatStepperModule } from "@angular/material/stepper";
import { DashboardPersonOneComponent } from './dashboard-person-one/dashboard-person-one.component';
import { DashboardPersonTwoComponent } from './dashboard-person-two/dashboard-person-two.component';
import { DashboardPersonThreeComponent } from './dashboard-person-three/dashboard-person-three.component';
import { DashboardPersonFourComponent } from './dashboard-person-four/dashboard-person-four.component';
import { DashboardPersonFiveComponent } from './dashboard-person-five/dashboard-person-five.component';
import { SafeTabletsListComponent } from './safe-tablets-list/safe-tablets-list.component';
import { HealthdiarylistComponent } from './healthdiarylist/healthdiarylist.component';
import { PrescriptionMemberComponent } from './prescription-member/prescription-member.component';
import { PrescriptionMReportComponent } from './prescription-m-report/prescription-m-report.component';
import { LabReportComponent } from './lab-report/lab-report.component';
import { LabMReportComponent } from './lab-m-report/lab-m-report.component';
import { ProcedureReportComponent } from './procedure-report/procedure-report.component';
import { ProcedureMReportComponent } from './procedure-m-report/procedure-m-report.component';
import { VacinationReportComponent } from './vacination-report/vacination-report.component';
import { VacinationMReportComponent } from './vacination-m-report/vacination-m-report.component';
import { DischargeSummaryComponent } from './discharge-summary/discharge-summary.component';
import { DischargeMSummaryComponent } from './discharge-m-summary/discharge-m-summary.component';
import { PastsurgerylistComponent } from './pastsurgerylist/pastsurgerylist.component';
import { PastmedicallistComponent } from './pastmedicallist/pastmedicallist.component';
import { BMILIST } from './add-bmi/mock-bmiList';
import { ContraindicatedtabletComponent } from './contraindicatedtablet/contraindicatedtablet.component';
import { MedicalbillComponent } from './medicalbill/medicalbill.component';
import { MedicalMBillComponent } from './medical-m-bill/medical-m-bill.component';
import { BpmeasureMemberComponent } from './bpmeasure-member/bpmeasure-member.component';
import { BpmeasureMMemberComponent } from './bpmeasure-m-member/bpmeasure-m-member.component';
import { HrmeasureMemberComponent } from './hrmeasure-member/hrmeasure-member.component';
import { HrmeasureMMemberComponent } from './hrmeasure-m-member/hrmeasure-m-member.component';
import { RrmeasureMemberComponent } from './rrmeasure-member/rrmeasure-member.component';
import { RrmeasureMMemberComponent } from './rrmeasure-m-member/rrmeasure-m-member.component';
import { OsmeasureMemberComponent } from './osmeasure-member/osmeasure-member.component';
import { OsmeasureMMemberComponent } from './osmeasure-m-member/osmeasure-m-member.component';
import { TempmeasureMemberComponent } from './tempmeasure-member/tempmeasure-member.component';
import { TempmeasureMMemberComponent } from './tempmeasure-m-member/tempmeasure-m-member.component';
import { BmimeasureMemberComponent } from './bmimeasure-member/bmimeasure-member.component';
import { CurrentMedicationComponent } from './current-medication/current-medication.component';
import { CurrentmedilistComponent } from './currentmedilist/currentmedilist.component';
import { InsurancedocComponent } from './insurancedoc/insurancedoc.component';
import { InsuranceMDocComponent } from './insurance-m-doc/insurance-m-doc.component';
import { PregnancyTimelineComponent } from './pregnancy-timeline/pregnancy-timeline.component';
import { DemoImgUploadComponent } from './demo-img-upload/demo-img-upload.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule }  from '@angular/material/sort';
import { CurrentmedimemberlistComponent } from './currentmedimemberlist/currentmedimemberlist.component';
import { EditHistoryNotepadComponent } from './edit-history-notepad/edit-history-notepad.component';
import { PastmedicalmemberlistComponent } from './pastmedicalmemberlist/pastmedicalmemberlist.component';
import { EditMedicalHistoryComponent } from './edit-medical-history/edit-medical-history.component';
import { PastsurgmemberlistComponent } from './pastsurgmemberlist/pastsurgmemberlist.component';
import { EditSurgicalHistoryComponent } from './edit-surgical-history/edit-surgical-history.component';
import { HealthdairymemberlistComponent } from './healthdairymemberlist/healthdairymemberlist.component';
import { EditHealthdairyHistoryComponent } from './edit-healthdairy-history/edit-healthdairy-history.component';
import { SymptomsmemberComponent } from './symptomsmember/symptomsmember.component';
import { AddSymptomsComponent } from './add-symptoms/add-symptoms.component';
import { SymptomslistComponent } from './symptomslist/symptomslist.component';
// import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { PregnantWomenlistComponent } from './pregnant-womenlist/pregnant-womenlist.component';
import { AddPregnantWomenComponent } from './add-pregnant-women/add-pregnant-women.component';
//import { PreMedicineNotificationComponent } from './notification/pre-medicine-notification/pre-medicine-notification.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PregnacyTimetableComponent } from './pregnacy-timetable/pregnacy-timetable.component';
import { LatestTestReportComponent } from './latest-test-report/latest-test-report.component';
import { LatestTestReportMemberComponent } from './latest-test-report-member/latest-test-report-member.component';
import { SearchDocumentComponent } from './search-document/search-document.component';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { FullBodyTestComponent } from './patient/book-appointment/full-body-test/full-body-test.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileAccessComponent } from './profile-access/profile-access.component';
import { TimeIntervalComponent } from './profile-access/time-interval/time-interval.component';
import { MeetComponent } from './meet/meet.component';
import { DashboardOneComponent } from './dashboard-one/dashboard-one.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PrescriptionsComponent,
    MedicalRecordsComponent,
    BillingComponent,
    SettingsComponent,
    AddBmiComponent,
    ProfilesComponent,
    AddProfileComponent,
    EditUserComponent,
    ProfileListComponent,
    ProfileComponent,
    PastmedicalhistoryComponent,
    PastsurgicalhistoryComponent,
    HealthdairyComponent,
    PatientdetailsComponent,
    MyprofileComponent,
    EditprofileComponent,
    PnancysymptomcheckComponent,
    DashboardPersonOneComponent,
    DashboardPersonTwoComponent,
    DashboardPersonThreeComponent,
    DashboardPersonFourComponent,
    DashboardPersonFiveComponent,
    SafeTabletsListComponent,
    HealthdiarylistComponent,
    PrescriptionMemberComponent,
    PrescriptionMReportComponent,
    LabReportComponent,
    LabMReportComponent,
    ProcedureReportComponent,
    ProcedureMReportComponent,
    VacinationReportComponent,
    VacinationMReportComponent,
    DischargeSummaryComponent,
    DischargeMSummaryComponent,
    PastsurgerylistComponent,
    PastmedicallistComponent,
    BMILIST,
    ContraindicatedtabletComponent,
    MedicalbillComponent,
    MedicalMBillComponent,
    BpmeasureMemberComponent,
    BpmeasureMMemberComponent,
    HrmeasureMemberComponent,
    HrmeasureMMemberComponent,
    RrmeasureMemberComponent,
    RrmeasureMMemberComponent,
    OsmeasureMemberComponent,
    OsmeasureMMemberComponent,
    TempmeasureMemberComponent,
    TempmeasureMMemberComponent,
    BmimeasureMemberComponent,
    CurrentMedicationComponent,
    CurrentmedilistComponent,
    InsurancedocComponent,
    InsuranceMDocComponent,
    PregnancyTimelineComponent,
    DemoImgUploadComponent,
    CurrentmedimemberlistComponent,
    EditHistoryNotepadComponent,
    PastmedicalmemberlistComponent,
    EditMedicalHistoryComponent,
    PastsurgmemberlistComponent,
    EditSurgicalHistoryComponent,
    HealthdairymemberlistComponent,
    EditHealthdairyHistoryComponent,
    SymptomsmemberComponent,
    AddSymptomsComponent,
    SymptomslistComponent,
    PregnantWomenlistComponent,
    AddPregnantWomenComponent,
    PregnacyTimetableComponent,
    LatestTestReportComponent,
    LatestTestReportMemberComponent,
    SearchDocumentComponent,
    FullBodyTestComponent,
    NotificationListComponent,
    ProfileAccessComponent,
    TimeIntervalComponent,
    MeetComponent,
    DashboardOneComponent,

   
  ],
  imports: [
    CommonModule,
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
    MatMenuModule,
    MatNativeDateModule
    // MatInputModule
  
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },         
  { provide: LOCALE_ID, useValue: "en-GB" },
  {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'},  ],
  
  
})
export class PatientModule {}
