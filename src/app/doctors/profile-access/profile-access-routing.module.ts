import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

const routes: Routes = 
[
  {
    path: "patient-list",
    component: PatientListComponent,
  },
  {
    path: "patient-add",
    component: PatientFormComponent,
  },
  {
    path: "patient-edit/:id",
    component: PatientFormComponent,
  },
  {
    path: "patient-profile/:request_id",
    component: PatientProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileAccessRoutingModule { }
