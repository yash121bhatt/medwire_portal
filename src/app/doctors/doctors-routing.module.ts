import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { EsignatureComponent } from './esignature/esignature.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MeetComponent } from './meet/meet.component';

const routes: Routes = 
[
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "my-profile",
    component: MyProfileComponent,
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
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
    path: "notification-list",
    component: NotificationListComponent,
  },
  {
    path: "esignature",
    component: EsignatureComponent,
  },
  { 
    path: "meet",
    component : MeetComponent 
  }, 
  {
    path: "patient-management",
    loadChildren: () =>
      import("./patient-management/patient-management.module").then(
        (m) => m.PatientManagementModule
      ),
  },
  {
    path: "profile-access",
    loadChildren: () =>
      import("./profile-access/profile-access.module").then(
        (m) => m.ProfileAccessModule
      ),
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: "lab-management",
    loadChildren: () =>
      import("./lab-management/lab-management.module").then(
        (m) => m.LabManagementModule
      ),
  },
  {
    path: "radio-management",
    loadChildren: () =>
      import("./radio-management/radio-management.module").then(
        (m) => m.RadioManagementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
