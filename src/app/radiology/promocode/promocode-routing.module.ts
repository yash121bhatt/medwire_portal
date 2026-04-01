import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocodeFormComponent } from './promocode-form/promocode-form.component';
import { PromocodeListComponent } from './promocode-list/promocode-list.component';

const routes: Routes = [
  {
    path: "promocode-list",
    component: PromocodeListComponent,
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
