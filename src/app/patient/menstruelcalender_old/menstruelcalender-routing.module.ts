import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MenstruelcalenderComponent } from "./menstruelcalender.component";

const routes: Routes = [
  {
    path: "",
    component: MenstruelcalenderComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenstruelcalenderRoutingModule { }
