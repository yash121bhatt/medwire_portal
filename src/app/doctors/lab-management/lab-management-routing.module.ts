import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLaborateryComponent } from './add-laboratery/add-laboratery.component';
import { LabListComponent } from './lab-list/lab-list.component';
import { LaboraroryFormComponent } from './laborarory-form/laborarory-form.component';

const routes: Routes = 
[
  {
    path: "lab-list",
    component: LabListComponent,
  },
  {
    path: "add-laboratory",
    component: AddLaborateryComponent,
  },
  {
    path: "edit-laboratory/:id",
    component: LaboraroryFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabManagementRoutingModule { }
