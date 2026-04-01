import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CgTrackerComponent } from './cg-tracker/cg-tracker.component';
import { AddChildComponent } from './add-child/add-child.component';
import { VaccinationScheduleComponent } from './vaccination-schedule/vaccination-schedule.component';
import { AddNewBabyComponent } from './add-new-baby/add-new-baby.component';
import { MilestoneTrackerComponent } from './milestone-tracker/milestone-tracker.component';
import { EditBabyComponent } from './edit-baby/edit-baby.component';
import { BabyGrowthViewListComponent } from './baby-growth-view-list/baby-growth-view-list.component';
import { VaccinationUpdateComponent } from './vaccination-update/vaccination-update.component';

const routes: Routes = [
  {
    path: "cg-tracker/:type",
    component: CgTrackerComponent,
  },
  {
    path: "milestone-tracker",
    component: MilestoneTrackerComponent,
  },
  {
    path: "add-new-baby",
    component: AddNewBabyComponent,
  },
  {
    path: "vaccination-schedule/:type",
    component: VaccinationScheduleComponent,
  },
  {
    path: "add-child",
    component: AddChildComponent,
  },
  {
    path: "edit-baby/: type",
    component: EditBabyComponent,
  },
  {
    path: "baby-growth-view-list",
    component: BabyGrowthViewListComponent,
  },
  {
    path: "vaccination-update",
    component: VaccinationUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaediatricGroupRoutingModule { }
