import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicHistoryComponent } from './clinic-history/clinic-history.component';
import { LaboratoryHistoryComponent } from './laboratory-history/laboratory-history.component';
import { RadiologyHistoryComponent } from './radiology-history/radiology-history.component';

const routes: Routes = [
  {
    path: 'clinic-history' ,
    component: ClinicHistoryComponent
  },
  {
    path: 'laboratory-history' , 
    component: LaboratoryHistoryComponent
  },
  {
    path: 'radiology-history' ,
    component: RadiologyHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingHistoryRoutingModule { }
