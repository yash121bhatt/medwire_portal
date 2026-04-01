import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

const routes: Routes = 
[
  {
    path: "add-notification",
    component: AddNotificationComponent,
  },
  {
    path: "edit-notification/:id",
    component: EditNotificationComponent,
  },
  {
    path: "notification-list",
    component: NotificationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
