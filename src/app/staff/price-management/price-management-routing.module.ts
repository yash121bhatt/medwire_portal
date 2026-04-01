import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { FeeFormComponent } from './fee-form/fee-form.component';

const routes: Routes = 
[
  {
    path: "fee-management",
    component: FeeManagementComponent,
  },
  {
    path: "add-doctor-fees",
    component: FeeFormComponent,
  },
  {
    path: "edit-doctor-fees/:id",
    component: FeeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceManagementRoutingModule { }
