import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';

const routes: Routes = [
  {
    path: "doctor-list",
    component: DoctorListComponent,
  },


  {
    path: "add-doctor",
    component: AddDoctorComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDoctorRoutingModule { }
