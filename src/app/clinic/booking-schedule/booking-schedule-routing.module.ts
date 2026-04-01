import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheduleManageComponent } from './shedule-manage/shedule-manage.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';

const routes: Routes = 
[
  {
    path: "shedule-manage/:id",
    component: SheduleManageComponent,
  },
  {
    path: "doctor-list",
    component: DoctorListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingScheduleRoutingModule { }
