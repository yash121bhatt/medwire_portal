import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';

const routes: Routes = 
[
  {
    path: "staff-list",
    component: StaffListComponent,
  },
  {
    path: "edit-staff/:id",
    component: EditStaffComponent,
  },
  {
    path: "add-staff",
    component: AddStaffComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManagementRoutingModule { }
