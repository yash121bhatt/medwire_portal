import { Page404Component } from "./../authentication/page404/page404.component";
import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicMyprofileComponent } from './clinic-myprofile/clinic-myprofile.component';
import { ClinicEditmyprofileComponent } from './clinic-editmyprofile/clinic-editmyprofile.component';
import { InsightsComponent } from './insights/insights.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { PlanListComponent } from "./plan-list/plan-list.component";
import { PlanPurchaseHistoryComponent } from "./plan-purchase-history/plan-purchase-history.component";
import { BillingHistoryComponent } from "./billing-history/billing-history.component";
import { InsightMonitoringListComponent } from "./insight-monitoring-list/insight-monitoring-list.component";
const routes: Routes = 
[
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "add-bank-detail",
    component: BankDetailComponent,
  },
  {
    path: "edit-bank-detail/:id",
    component: BankDetailComponent,
  },
  {
    path: "clinic-myprofile",
    component: ClinicMyprofileComponent,
  },
  {
    path: "clinic-editmyprofile",
    component: ClinicEditmyprofileComponent,
  },
  {
    path: "insights",
    component: InsightsComponent,
  },
  {
   path:"notification-list",
   component: NotificationListComponent
  },
  {
    path : "plan-purchase-history",
    component : PlanPurchaseHistoryComponent
  },
  {
    path: "billing-history",
    component: BillingHistoryComponent,
  },
  {
    path: "doctor",
    loadChildren: () =>
      import("./doctor/doctor.module").then(
        (m) => m.DoctorModule
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
    path: "price-management",
    loadChildren: () =>
      import("./price-management/price-management.module").then(
        (m) => m.PriceManagementModule
      ),
  },
  {
    path: "staff-management",
    loadChildren: () =>
      import("./staff-management/staff-management.module").then(
        (m) => m.StaffManagementModule
      ),
  },
  {
    path: "promocode",
    loadChildren: () =>
      import("./promocode/promocode.module").then(
        (m) => m.PromocodeModule
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
    path : "plan-list",
    component : PlanListComponent
  },
  {
    path: "booking-schedule",
    loadChildren: () =>
      import("./booking-schedule/booking-schedule.module").then(
        (m) => m.BookingScheduleModule
      ),
  },
  {
    path: "appointment",
    loadChildren: () =>
      import("./appointment/appointment.module").then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: "insight-monitoring-list",
    component: InsightMonitoringListComponent,
  },
  {
    path: "prescription",
    loadChildren: () =>
      import("./prescription/prescription.module").then(
        (m) => m.PrescriptionModule
      ),
  },


  
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
