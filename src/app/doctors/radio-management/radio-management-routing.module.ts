import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologyListComponent } from './radiology-list/radiology-list.component';
import { RadiologyFormComponent } from './radiology-form/radiology-form.component';
import { AddRadiologyComponent } from './add-radiology/add-radiology.component';

const routes: Routes = 
[
  {
    path: "radiology-list",
    component: RadiologyListComponent,
  },
  {
    path: "add-radiology",
    component: AddRadiologyComponent,
  },
  {
    path: "edit-radiology/:id",
    component: RadiologyFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioManagementRoutingModule { }
