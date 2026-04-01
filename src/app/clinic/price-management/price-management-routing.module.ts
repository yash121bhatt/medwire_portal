import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeeManagementComponent } from './fee-management/fee-management.component';
import { AddDoctorFeesComponent } from './add-doctor-fees/add-doctor-fees.component';
import { EditDoctorFeesComponent } from './edit-doctor-fees/edit-doctor-fees.component';

const routes: Routes = 
[
  {
    path: "fee-management",
    component: FeeManagementComponent,
  },
  {
    path: "add-doctor-fees",
    component: AddDoctorFeesComponent,
  },
  {
    path: "edit-doctor-fees/:type",
    component: EditDoctorFeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceManagementRoutingModule { }
