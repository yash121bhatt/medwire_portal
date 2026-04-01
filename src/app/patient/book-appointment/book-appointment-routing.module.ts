import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { BookedAppointmentListComponent } from './booked-appointment-list/booked-appointment-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { FullBodyTestComponent } from './full-body-test/full-body-test.component';
import { LabAddAppointmentComponent } from './lab-add-appointment/lab-add-appointment.component';
import { LaboratoryAppointmentsComponent } from './laboratory-appointments/laboratory-appointments.component';
import { LaboratoryUserListComponent } from './laboratory-user-list/laboratory-user-list.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { RadioAddAppointmentComponent } from './radio-add-appointment/radio-add-appointment.component';
import { RadioCartPageComponent } from './radio-cart-page/radio-cart-page.component';
import { RadioPaymentMethodComponent } from './radio-payment-method/radio-payment-method.component';
import { RadioUserListComponent } from './radio-user-list/radio-user-list.component';
import { RadiologyAppointmentComponent } from './radiology-appointment/radiology-appointment.component';
import { SingleBodyTestComponent } from './single-body-test/single-body-test.component';

const routes: Routes = [
  {
    path: "appointment-list",
    component: AppointmentListComponent,
  },
  {
    path: "booked-appointment-list/:id",
    component: BookedAppointmentListComponent,
  },
  {
    path: "add-appointment/:id",
    component: AddAppointmentComponent,
  },
  {
    path: 'laboratory-user-list' , 
    component: LaboratoryUserListComponent
  },
  {
    path: 'laboratory-appointments/:userId' , 
    component: LaboratoryAppointmentsComponent
  },
  {
    path: 'lab-add-appointment/:userId' , 
    component: LabAddAppointmentComponent
  },
  {
    path: 'full-body-test/:packageId/:userId' , 
    component: FullBodyTestComponent
  },
  {
    path: 'single-body-test/:testId/:userId' , 
    component: SingleBodyTestComponent
  },
  {
    path: 'cart-page/:labId/:userId' , 
    component: CartPageComponent
  },
  {
    path: 'payment-method/:labId/:userId' , 
    component: PaymentMethodComponent
  },
  {
    path: 'doctor-appointment/:memberId/:type/:id' , 
    component: DoctorAppointmentComponent
  },
  {
    path: 'radio-user-list' , 
    component: RadioUserListComponent
  },
  {
    path: 'radiology-appointment/:userId' ,
    component: RadiologyAppointmentComponent
  },
  {
    path: 'radio-add-appointment/:userId' ,
    component: RadioAddAppointmentComponent
  },
  {
    path: 'radio-cart-page/:labId/:userId' ,
    component: RadioCartPageComponent
  },
  {
    path: 'radio-payment-method/:labId/:userId' , 
    component: RadioPaymentMethodComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookAppointmentRoutingModule { }
