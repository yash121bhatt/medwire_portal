import { Page404Component } from "./../authentication/page404/page404.component";
import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {AddBmiComponent } from "./add-bmi/add-bmi.component";
import { PrescriptionsComponent } from "./prescriptions/prescriptions.component";
import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
import { BillingComponent } from "./billing/billing.component";
import { SettingsComponent } from "./settings/settings.component";
import { ProfilesComponent } from "./profiles/profiles.component";
import { AddProfileComponent} from "./add-profile/add-profile.component"
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { ProfileComponent } from './profile/profile.component';
import { PastmedicalhistoryComponent } from './pastmedicalhistory/pastmedicalhistory.component';
import { PastsurgerylistComponent } from './pastsurgerylist/pastsurgerylist.component';
import { PastsurgicalhistoryComponent } from './pastsurgicalhistory/pastsurgicalhistory.component';
import { HealthdairyComponent } from './healthdairy/healthdairy.component';
import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
// import { MenstrualcalendarComponent } from './menstrualcalendar/menstrualcalendar.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { PnancysymptomcheckComponent } from './pnancysymptomcheck/pnancysymptomcheck.component';
import { DashboardPersonOneComponent } from './dashboard-person-one/dashboard-person-one.component';
import { DashboardPersonTwoComponent } from './dashboard-person-two/dashboard-person-two.component';
import { DashboardPersonThreeComponent } from './dashboard-person-three/dashboard-person-three.component';
import { DashboardPersonFourComponent } from './dashboard-person-four/dashboard-person-four.component';
import { DashboardPersonFiveComponent } from './dashboard-person-five/dashboard-person-five.component';
import { SafeTabletsListComponent } from './safe-tablets-list/safe-tablets-list.component';
import { ContraindicatedtabletComponent } from './contraindicatedtablet/contraindicatedtablet.component';
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
import { PastmedicallistComponent } from './pastmedicallist/pastmedicallist.component';
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
import { InsuranceMDocComponent } from './insurance-m-doc/insurance-m-doc.component';
import { InsurancedocComponent } from './insurancedoc/insurancedoc.component';
import { PregnancyTimelineComponent } from './pregnancy-timeline/pregnancy-timeline.component';
import { DemoImgUploadComponent } from "./demo-img-upload/demo-img-upload.component";
import { CurrentmedimemberlistComponent } from "./currentmedimemberlist/currentmedimemberlist.component";
import { EditHistoryNotepadComponent } from "./edit-history-notepad/edit-history-notepad.component";
import { PastmedicalmemberlistComponent } from "./pastmedicalmemberlist/pastmedicalmemberlist.component";
import { EditMedicalHistoryComponent } from "./edit-medical-history/edit-medical-history.component";
import { PastsurgmemberlistComponent } from "./pastsurgmemberlist/pastsurgmemberlist.component";
import { EditSurgicalHistoryComponent } from "./edit-surgical-history/edit-surgical-history.component";
import { HealthdairymemberlistComponent } from "./healthdairymemberlist/healthdairymemberlist.component";
import { EditHealthdairyHistoryComponent } from "./edit-healthdairy-history/edit-healthdairy-history.component";
import { SymptomsmemberComponent } from "./symptomsmember/symptomsmember.component";
import { AddSymptomsComponent } from "./add-symptoms/add-symptoms.component";
import { SymptomslistComponent } from "./symptomslist/symptomslist.component";
// import { PregnantWomenlistComponent } from "./pregnant-womenlist/pregnant-womenlist.component";
import { AddPregnantWomenComponent } from "./add-pregnant-women/add-pregnant-women.component";
import { PregnacyTimetableComponent } from "./pregnacy-timetable/pregnacy-timetable.component";
import { LatestTestReportMemberComponent } from "./latest-test-report-member/latest-test-report-member.component";
import { LatestTestReportComponent } from "./latest-test-report/latest-test-report.component";
import { SearchDocumentComponent } from "./search-document/search-document.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { ProfileAccessComponent } from "./profile-access/profile-access.component";
import { MeetComponent } from "./meet/meet.component";
import { DashboardOneComponent } from "./dashboard-one/dashboard-one.component";


const routes: Routes = [
  {
    path: "myprofile",
    component: MyprofileComponent,
  },
  {
    path: "osmeasure-m-member/:type",
    component: OsmeasureMMemberComponent,
  },
  {
    path: "tempmeasure-m-member/:type",
    component: TempmeasureMMemberComponent,
  },
  {
    path: "pregnancy-timeline/:type",
    component: PregnancyTimelineComponent,
  },
  {
    path: "insurance-m-doc",
    component: InsuranceMDocComponent,
  },
  {
    path: "insurancedoc/:type",
    component: InsurancedocComponent,
  },
  {
    path: "currentmedilist/:type",
    component: CurrentmedilistComponent,
  },
  {
    path: "current-medication/:type",
    component: CurrentMedicationComponent,
  },
  {
    path: "bmimeasure-member",
    component: BmimeasureMemberComponent,
  },
  {
    path: "tempmeasure-member",
    component: TempmeasureMemberComponent,
  },
  {
    path: "osmeasure-member",
    component: OsmeasureMemberComponent,
  },
  {
    path: "rrmeasure-member",
    component: RrmeasureMemberComponent,
  },
  {
    path: "rrmeasure-m-member/:type",
    component: RrmeasureMMemberComponent,
  },
  {
    path: "hrmeasure-member",
    component: HrmeasureMemberComponent,
  },
  {
    path: "hrmeasure-m-member/:type",
    component: HrmeasureMMemberComponent,
  },
  {
    path: "bpmeasure-member",
    component: BpmeasureMemberComponent,
  },
  {
    path: "bpmeasure-m-member/:type",
    component: BpmeasureMMemberComponent,
  },
  {
    path: "medical-m-bill",
    component: MedicalbillComponent,
  },
  {
    path: "medicalbill/:type",
    component: MedicalMBillComponent,
  },
  {
    path: "discharge-m-summary/:type",
    component: DischargeMSummaryComponent,
  },
  {
    path: "pastmedicallist/:type",
    component: PastmedicallistComponent,
  },
  {
    path: "pastsurgerylist/:type",
    component: PastsurgerylistComponent,
  },
  {
    path: "discharge-summary",
    component: DischargeSummaryComponent,
  },
  {
    path: "vacination-report",
    component: VacinationReportComponent,
  },
  {
    path: "vacination-m-report/:type",
    component: VacinationMReportComponent,
  },
  {
    path: "procedure-report",
    component: ProcedureReportComponent,
  },
  {
    path: "procedure-m-report/:type",
    component: ProcedureMReportComponent,
  },
  {
    path: "lab-m-report/:type",
    component: LabMReportComponent,
  },
  {
    path: "prescription-member",
    component: PrescriptionMemberComponent,
  },
  {
    path: "lab-report",
    component: LabReportComponent,
  },
  {
    path: "prescription-m-report/:type",
    component: PrescriptionMReportComponent,
  },
  {
    path: "safe-tablets-list",
    component: SafeTabletsListComponent,
  },
  {
    path: "contraindicatedtablet",
    component: ContraindicatedtabletComponent,
  },
  {
    path: "healthdiarylist/:type",
    component: HealthdiarylistComponent,
  },
  {
    path: "dashboard-person-one",
    component: DashboardPersonOneComponent,
  },
  {
    path: "dashboard-person-two",
    component: DashboardPersonTwoComponent,
  },
  {
    path: "dashboard-person-three",
    component: DashboardPersonThreeComponent,
  },
  {
    path: "dashboard-person-four",
    component: DashboardPersonFourComponent,
  },
  {
    path: "dashboard-person-five",
    component: DashboardPersonFiveComponent,
  },
  {
    path: "pnancysymptomcheck",
    component: PnancysymptomcheckComponent,
  },
  {
    path: "patientdetails",
    component: PatientdetailsComponent,
  },
  {
    path: "editprofile",
    component: EditprofileComponent,
  },
  {
    path: "dashboard/:type",
    component: DashboardComponent,
  },
  {
    path: "dashboard",
    component: DashboardOneComponent,
  },
  {
    path:"add-bmi/:type",
    component: AddBmiComponent,
  },
  {
    path:"add-profile",
    component: AddProfileComponent,
  },
  {
    path:"edit-user/:type",
    component: EditUserComponent,
  },
  {
    path:"profile-list",
    component: ProfileListComponent
  },
  {
    path:"Profiles",
    component: ProfilesComponent,
  },
  {
    path:"profile",
    component: ProfileComponent
  },
  {
    path:"pastmedicalhistory/:type",
    component: PastmedicalhistoryComponent
  },
  {
    path:"pastsurgicalhistory/:type",
    component: PastsurgicalhistoryComponent
  },
  {
    path:"healthdairy/:type",
    component: HealthdairyComponent
  },
  {
  path: "currentmedimemberlist",
  component: CurrentmedimemberlistComponent,
  },
  {
    path: "healthdairymemberlist",
    component: HealthdairymemberlistComponent,
    },
  {
    path: "pastmedicalmemberlist",
    component: PastmedicalmemberlistComponent,
    },
  {
    path: "edit-surgical-history/:type/:hnid/:description",
    component: EditSurgicalHistoryComponent,
    },
  {
    path: "edit-history-notepad/:type/:hnid/:description",
    component: EditHistoryNotepadComponent,
    },
    {
      path: "edit-medical-history/:type/:hnid/:description",
      component: EditMedicalHistoryComponent,
      },
      {
        path: "edit-healthdairy-history/:type/:hnid/:description",
        component: EditHealthdairyHistoryComponent,
        },
    {
      path: "pastsurgmemberlist",
      component: PastsurgmemberlistComponent,
    },
    {
      path: "symptomsmember",
      component: SymptomsmemberComponent,
    },
    {
      path: "add-symptoms/:type",
      component: AddSymptomsComponent,
    },

    {
      path: "symptomslist/:type",
      component: SymptomslistComponent,
    },
    // {
    //   path: "pregnent-womenList",
    //   component: PregnantWomenlistComponent,
    // },
    {
      path: "add-pregnentwomen",
      component: AddPregnantWomenComponent,
    },
    {
      path: "pregnant-timeline",
      component: PregnacyTimetableComponent,
    },
    {
      path: "latest-test-report",
      component: LatestTestReportMemberComponent,
    },
    {
      path: "latest-report/:type",
      component: LatestTestReportComponent,
    },
    {
      path: "search-document",
      component: SearchDocumentComponent,
    },
    {
      path: "notification-list",
      component: NotificationListComponent,
    },
    { 
      path: "meet",
      component : MeetComponent 
    }, 

  {
    path: "appointments",
    loadChildren: () =>
      import("./appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: "pregnant-woman",
    loadChildren: () =>
      import("./pregnant-woman/pregnant-woman.module").then(
        (m) => m.PregnantWomanModule
      ),
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./notifications/notifications.module").then(
        (m) => m.NotificationsModule
      ),
  },
  {
    path: "patient-doctor",
    loadChildren: () =>
      import("./patient-doctor/patient-doctor.module").then(
        (m) => m.PatientDoctorModule
      ),
  },
  {
    path: "menstruelcalender",
    loadChildren: () =>
      import("./menstruelcalender/menstruelcalender.module").then(
        (m) => m.MenstruelcalenderModule
      ),
  },
  {
    path: "paediatric-group",
    loadChildren: () =>
      import("./paediatric-group/paediatric-group.module").then(
        (m) => m.PaediatricGroupModule
      ),
  },

  {
    path: "book-appointment",
    loadChildren: () =>
      import("./book-appointment/book-appointment.module").then(
        (m) => m.BookAppointmentModule
      ),
  },
  {
    path: "booking-history",
    loadChildren: () =>
      import("./booking-history/booking-history.module").then(
        (m) => m.BookingHistoryModule
      ),
  },
  
  {
    path: "prescriptions",
    component: PrescriptionsComponent,
  },
  {
    path: "records",
    component: MedicalRecordsComponent,
  },
  {
    path: "billing",
    component: BillingComponent,
  },
  {
    path: "profile-access",
    component: ProfileAccessComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "demo_file",
    component: DemoImgUploadComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
