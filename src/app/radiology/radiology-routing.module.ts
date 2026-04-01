import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologyVisitsComponent } from './radiology-visits/radiology-visits.component';
import { NewVisitComponent } from './new-visit/new-visit.component';
import { UploadBulkReportComponent } from './upload-bulk-report/upload-bulk-report.component';
import { RadiomyprofileComponent } from './radiomyprofile/radiomyprofile.component';
import { RadioeditprofileComponent } from './radioeditprofile/radioeditprofile.component';
import { PatientListStepComponent } from './patient-list-step/patient-list-step.component';
import { EditBankDetailComponent } from './edit-bank-detail/edit-bank-detail.component';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { DoctorManagementComponent } from './doctor-management/doctor-management.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanPurchaseHistoryComponent } from './plan-purchase-history/plan-purchase-history.component';
import { InslightMonitoringListComponent } from './inslight-monitoring-list/inslight-monitoring-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: "radiology-visits",
    component: RadiologyVisitsComponent,
  },
  {
    path: "radiomyprofile",
    component: RadiomyprofileComponent,
  },
  {
    path: "radioeditprofile",
    component: RadioeditprofileComponent,
  },
  {
    path: "new-visit",
    component: NewVisitComponent,
  },
  {
    path: "upload-bulk-report",
    component: UploadBulkReportComponent,
  },
  {
    path: "patient-list-step",
    component: PatientListStepComponent,
  },
  {
    path: 'edit-bank-detail',
    component: EditBankDetailComponent
  },
  {
    path: "billing-history",
    component: BillingHistoryComponent,
  },
  {
    path: 'doctor-management',
    component: DoctorManagementComponent
  },
  {
    path:'notification-list',
    component:NotificationListComponent
  },
  {
    path: "plan-purchase-history",
    component: PlanPurchaseHistoryComponent,
  },
  {
    path: "inslight-monitoring-list",
    component: InslightMonitoringListComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "radiology-items",
    loadChildren: () =>
      import("./radiology-items/radiology-items.module").then(
        (m) => m.RadiologyItemsModule
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
    path: "appointment-management",
    loadChildren: () =>
      import("./appointment-management/appointment-management.module").then(
        (m) => m.AppointmentManagementModule
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologyRoutingModule { }
