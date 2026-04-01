import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';

const routes: Routes = 
[
  {
    path: "appointment-list/:type",
    component: AppointmentListComponent,
  },
  {
    path: "clinic-list",
    component: ClinicListComponent,
  },
  {
    path: "prescriptions",
    loadChildren: () =>
      import("./prescriptions/prescriptions.module").then(
        (m) => m.PrescriptionsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
