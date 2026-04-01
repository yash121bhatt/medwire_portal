import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { PaymentThankyouComponent } from "./payment-thankyou/payment-thankyou.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
     // {
      //  path: "admin",
      //  canActivate: [AuthGuard],
      //  data: {
      //    role: Role.Admin,
      //  },
      //  loadChildren: () =>
     //     import("./admin/admin.module").then((m) => m.AdminModule),
     // },
      {
        path: "doctor",
        canActivate: [AuthGuard],
        data: {
          role: Role.laboratories,
        },
        loadChildren: () =>
          import("./doctor/doctor.module").then((m) => m.DoctorModule),
      },
      {
        path: "patient",
        canActivate: [AuthGuard],
        data: {
          role: Role.patient,
        },
        loadChildren: () =>
          import("./patient/patient.module").then((m) => m.PatientModule),
      },
      {
        path: "radiology",
        canActivate: [AuthGuard],
        data: {
          role: Role.radiology,
        },
        loadChildren: () =>
          import("./radiology/radiology.module").then((m) => m.RadiologyModule),
      },
      {
        path: "clinic",
        canActivate: [AuthGuard],
        data: {
          role: Role.clinic
        },
        loadChildren: () =>
          import("./clinic/clinic.module").then((m) => m.ClinicModule),
      },
      {
        path: "staff",
        canActivate: [AuthGuard],
        data: {
          role: [Role.staff ,Role.receiptionist, Role.prescription_writer],
        },
        loadChildren: () =>
          import("./staff/staff.module").then((m) => m.StaffModule),
      },
      {
        path: "doctors",
        canActivate: [AuthGuard],
        data: {
          role: Role.doctor,
        },
        loadChildren: () =>
          import("./doctors/doctors.module").then((m) => m.DoctorsModule),
      },
      {
        path: "calendar",
        loadChildren: () =>
          import("./calendar/calendar.module").then((m) => m.CalendarsModule),
      },
      {
        path: "task",
        loadChildren: () =>
          import("./task/task.module").then((m) => m.TaskModule),
      },
      {
        path: "contacts",
        loadChildren: () =>
          import("./contacts/contacts.module").then((m) => m.ContactsModule),
      },
      {
        path: "email",
        loadChildren: () =>
          import("./email/email.module").then((m) => m.EmailModule),
      },
      {
        path: "calendar",
        loadChildren: () =>
          import("./apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: "apps",
        loadChildren: () =>
          import("./apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: "widget",
        loadChildren: () =>
          import("./widget/widget.module").then((m) => m.WidgetModule),
      },
      {
        path: "ui",
        loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "media",
        loadChildren: () =>
          import("./media/media.module").then((m) => m.MediaModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "timeline",
        loadChildren: () =>
          import("./timeline/timeline.module").then((m) => m.TimelineModule),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "extra-pages",
        loadChildren: () =>
          import("./extra-pages/extra-pages.module").then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "multilevel",
        loadChildren: () =>
          import("./multilevel/multilevel.module").then(
            (m) => m.MultilevelModule
          ),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: "payment-thankyou", component: PaymentThankyouComponent },
  { path: "main-layout", component: MainLayoutComponent },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
