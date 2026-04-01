import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PatientsComponent } from "./patients/patients.component";
import { SettingsComponent } from "./settings/settings.component";
import { VisitsPageComponent } from './visits-page/visits-page.component';
import { NewVisitComponent } from './new-visit/new-visit.component';
import { BulkReportComponent } from './bulk-report/bulk-report.component';
import { LabmyprofileComponent } from './labmyprofile/labmyprofile.component';

import { LabeditprofileComponent } from './labeditprofile/labeditprofile.component';
import { PatientListStepComponent } from "./patient-list-step/patient-list-step.component";
import { EditBankDetailComponent } from "./edit-bank-detail/edit-bank-detail.component";
import { BillingHistoryComponent } from "./billing-history/billing-history.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { PlanListComponent } from "./plan-list/plan-list.component";
import { DoctorManagementComponent } from "./doctor-management/doctor-management.component";
import { PlanPurchaseHistoryComponent } from "./plan-purchase-history/plan-purchase-history.component";
import { InslightMonitoringListComponent } from "./inslight-monitoring-list/inslight-monitoring-list.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "labmyprofile",
    component: LabmyprofileComponent,
  },
  {
    path: "labeditprofile",
    component: LabeditprofileComponent,
  },
  {
    path: "bulk-report",
    component: BulkReportComponent,
  },
  {
    path: "visits-page",
    component: VisitsPageComponent,
  },
  {
    path: "doctor-management",
    component: DoctorManagementComponent,
  },
  {
    path: "new-visit",
    component: NewVisitComponent,
  },
  {
    path: "appointments",
    component: AppointmentsComponent,
  },
  {
    path: "doctors",
    component: DoctorsComponent,
  },
  {
    path: "patients",
    component: PatientsComponent,
  },
  {
    path: "patient-list-step",
    component: PatientListStepComponent,
  },
  {
    path: "edit-bank-detail",
    component: EditBankDetailComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "inslight-monitoring-list",
    component: InslightMonitoringListComponent,
  },

  {
    path : "plan-purchase-history",
    component : PlanPurchaseHistoryComponent
  },

  {
    path: "laboratory-items",
    loadChildren: () =>
      import("./laboratory-items/laboratory-items.module").then(
        (m) => m.LaboratoryItemsModule
      ),
  },
  {
    path: "patient-management",
    loadChildren: () =>
      import("./patient-management/patient-management.module").then(
        (m) => m.PatientManagementModule
      ),
  },
  {
    path: "billing-history",
    component: BillingHistoryComponent,
  },
  {
    path:"notification-list",
    component: NotificationListComponent
  },
  {
    path: "appointment-manage",
    loadChildren: () =>
    import("./appointment-manage/appointment-manage.module").then(
      (m) => m.AppointmentManageModule
    ),
  },
  {
    path: "plan-list",
    component: PlanListComponent,
  },
  {
    path: "promocode",
    loadChildren: () =>
      import("./promocode/promocode.module").then(
        (m) => m.PromocodeModule
      ),
  },
  {
    path: "notification",
    loadChildren: () =>
      import("./notification/notification.module").then(
        (m) => m.NotificationModule
      ),
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
