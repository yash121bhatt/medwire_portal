import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';

const routes: Routes = 
[
  {
    path: "doctor-list",
    component: DoctorListComponent,
  },
  {
    path: "add-doctor",
    component: AddDoctorComponent,
  },
  {
    path: "edit-doctor/:type",
    component: EditDoctorComponent,
  },
  {
    path: "plan-details",
    component: PlanDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
