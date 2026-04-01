import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';

const routes: Routes = 
[
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
    component: EditNotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
