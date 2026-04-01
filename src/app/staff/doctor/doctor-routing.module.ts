import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

const routes: Routes = 
[
{
  path: "doctor-list",
  component: DoctorListComponent,
},
{
  path: "add-doctor",
  component: DoctorFormComponent,
},
{
  path: "edit-doctor/:id",
  component: EditDoctorComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
