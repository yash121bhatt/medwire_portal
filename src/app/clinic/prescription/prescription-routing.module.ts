import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionHeaderComponent } from './prescription-header/prescription-header.component';
import { PrescriptionFooterComponent } from './prescription-footer/prescription-footer.component';

const routes: Routes = 
[
  {
    path: "prescription-header",
    component: PrescriptionHeaderComponent,
  },
  {
    path: "prescription-footer",
    component: PrescriptionFooterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
