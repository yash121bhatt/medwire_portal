import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocodeManagementComponent } from './promocode-management/promocode-management.component';
import { PromocodeFormComponent } from './promocode-form/promocode-form.component';

const routes: Routes = 
[
  {
    path: "promocode-management",
    component: PromocodeManagementComponent,
  },
  {
    path: "add-promocode",
    component: PromocodeFormComponent,
  },
  {
    path: "edit-promocode/:id",
    component: PromocodeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocodeRoutingModule { }
