import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffMyprofileComponent } from './staff-myprofile/staff-myprofile.component';
import { StaffEditmyprofileComponent } from './staff-editmyprofile/staff-editmyprofile.component';
import { InsightsComponent } from './insights/insights.component';
import { BillingHistoryComponent } from './billing-history/billing-history.component';

const routes: Routes = 
[
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "billing-history",
    component: BillingHistoryComponent,
  },
  {
    path: "staff-myprofile",
    component: StaffMyprofileComponent,
  },
  {
    path: "staff-editmyprofile",
    component: StaffEditmyprofileComponent,
  },
  {
    path: "insights",
    component: InsightsComponent,
  },
  {
    path: "doctor",
    loadChildren: () =>
      import("./doctor/doctor.module").then(
        (m) => m.DoctorModule
      ),
  },
  {
    path: "booking-schedule",
    loadChildren: () =>
      import("./booking-schedule/booking-schedule.module").then(
        (m) => m.BookingScheduleModule
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
    path: "appointment",
    loadChildren: () =>
      import("./appointment/appointment.module").then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: "fees",
    loadChildren: () =>
      import("./fees-management-staff/fees-management-staff.module").then(
        (m) => m.FeesManagementStaffModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
