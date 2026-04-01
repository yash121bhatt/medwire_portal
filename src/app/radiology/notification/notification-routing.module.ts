import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

const routes: Routes = [
  {
    path: "notification-list",
    component: NotificationListComponent,
  },
  {
    path: "add-notification",
    component: NotificationFormComponent,
  },
  {
    path: "edit-notification/:id",
    component: NotificationFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
