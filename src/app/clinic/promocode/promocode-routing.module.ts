import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PromocodeManagementComponent } from './promocode-management/promocode-management.component';
import { AddPromocodeComponent } from './add-promocode/add-promocode.component';
import { EditPromocodeComponent } from './edit-promocode/edit-promocode.component';

const routes: Routes = 
[
  {
    path: "promocode-management",
    component: PromocodeManagementComponent,
  },
  {
    path: "add-promocode",
    component: AddPromocodeComponent,
  },
  {
    path: "edit-promocode",
    component: EditPromocodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocodeRoutingModule { }
