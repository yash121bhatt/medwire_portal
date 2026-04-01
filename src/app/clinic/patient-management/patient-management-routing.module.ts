import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';

const routes: Routes = 
[
  {
    path: "patient-list",
    component: PatientListComponent,
  },
  {
    path: "add-patient",
    component: PatientFormComponent,
  },
  {
    path: "edit-patient/:id",
    component: EditPatientComponent,
  },
  {
    path: "book-appointment/:id",
    component: BookAppointmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientManagementRoutingModule { }
