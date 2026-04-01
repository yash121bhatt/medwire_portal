import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorFeesListComponent } from './doctor-fees-list/doctor-fees-list.component';
import { AddFeesComponent } from './add-fees/add-fees.component';
import { EditFeesComponent } from './edit-fees/edit-fees.component';

const routes: Routes = [
  {
    path:'doctor-fees-list',
    component: DoctorFeesListComponent
  },
  {
    path:'add-doctor-fees',
    component:AddFeesComponent
  },
  {
    path:'edit-doctor-fees/:type',
    component:EditFeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesManagementStaffRoutingModule { }
