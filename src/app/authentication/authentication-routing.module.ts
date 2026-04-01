import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

import { RegisterotpsubmitComponent } from './registerotpsubmit/registerotpsubmit.component';
import { OtpsubmitComponent } from './otpsubmit/otpsubmit.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LockedComponent } from "./locked/locked.component";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "signin/:user_role_id",
    component: SigninComponent,
  },
  {
    path: "registerotpsubmit",
    component: RegisterotpsubmitComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "forgot-password/:user_role_id",
    component: ForgotPasswordComponent,
  },
  {
    path: "otpsubmit",
    component: OtpsubmitComponent,
  },
  {
    path: "resetpassword",
    component: ResetpasswordComponent,
  },
  {
    path: "locked",
    component: LockedComponent,
  },
  {
    path: "page404",
    component: Page404Component,
  },
  {
    path: "page500",
    component: Page500Component,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
