import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PregnantWomenlistComponent } from '../pregnant-womenlist/pregnant-womenlist.component';
// import { PregnantWomenlistComponent } from '../pregnant-womenlist/pregnant-womenlist.component';

const routes: Routes = [
  {
    path: "pregnent-womenList",
    component: PregnantWomenlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PregnantWomanRoutingModule { }
