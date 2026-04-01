import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentlistComponent } from './appointment-list/appointment-list.component';

const routes: Routes = [
  {
    path: 'appointment-list' ,
    component: AppointmentlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentManagementRoutingModule { }
