import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionTabsComponent } from './prescription-tabs/prescription-tabs.component';

const routes: Routes = 
[
  {
    path: "prescription-tabs/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabs/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabszero/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabsone/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabstwo/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabsthree/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabsfour/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabsfive/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabssix/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
  {
    path: "prescription-tabsseven/:type/:appointment_id",
    component: PrescriptionTabsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionsRoutingModule { }
