import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { MedicineNtfctnComponent } from './medicine-ntfctn/medicine-ntfctn.component';
import { MedicineReminderComponent } from './medicine-reminder/medicine-reminder.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { LabTestDetailComponent } from './lab-test-detail/lab-test-detail.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { PreMedicineNotificationComponent } from './pre-medicine-notification/pre-medicine-notification.component';
import { LabTestMemberComponent } from './lab-test-member/lab-test-member.component';
import { BookAppointmentMemberComponent } from './book-appointment-member/book-appointment-member.component';

const routes: Routes = [
  {
    path: "lab-test-detail/:type",
    component: LabTestDetailComponent,
  },
  {
    path: "medicine-notification/:type",
    component: MedicineNtfctnComponent,
  },
  {
    path: "pre-medicine-member",
    component: PreMedicineNotificationComponent,
  },
  {
    path: "appointment-detail/:type",
    component: AppointmentDetailComponent,
  },
  {
    path: "book-appointment/:type",
    component: BookAppointmentComponent,
  },
  {
    path: "lab-test/:type",
    component: LabTestComponent,
  },
  {
    path: "medicine-reminder/:type",
    component: MedicineReminderComponent,
  },
  {
    path: "lab-test-member",
    component: LabTestMemberComponent,
  },
  {
    path: "book-appointment-member",
    component: BookAppointmentMemberComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
