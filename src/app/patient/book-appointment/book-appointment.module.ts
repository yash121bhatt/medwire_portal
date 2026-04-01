import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatRadioModule } from "@angular/material/radio";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { LaboratoryUserListComponent } from './laboratory-user-list/laboratory-user-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LaboratoryAppointmentsComponent } from './laboratory-appointments/laboratory-appointments.component';
import { LabAddAppointmentComponent } from './lab-add-appointment/lab-add-appointment.component';
import { FullBodyTestComponent } from './full-body-test/full-body-test.component';
import { SingleBodyTestComponent } from './single-body-test/single-body-test.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { BookedAppointmentListComponent } from './booked-appointment-list/booked-appointment-list.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { RadioUserListComponent } from './radio-user-list/radio-user-list.component';
import { RadiologyAppointmentComponent } from './radiology-appointment/radiology-appointment.component';
import { RadioAddAppointmentComponent } from './radio-add-appointment/radio-add-appointment.component';
import { RadioCartPageComponent } from './radio-cart-page/radio-cart-page.component';
import { RadioPaymentMethodComponent } from './radio-payment-method/radio-payment-method.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";


@NgModule({
  declarations: [
    LaboratoryUserListComponent,
    LaboratoryAppointmentsComponent,
    LabAddAppointmentComponent,
    FullBodyTestComponent,
    SingleBodyTestComponent,
    CartPageComponent,
    PaymentMethodComponent,
    AppointmentListComponent,
    BookedAppointmentListComponent,
    AddAppointmentComponent,
    DoctorAppointmentComponent,
    RadioUserListComponent,
    RadiologyAppointmentComponent,
    RadioAddAppointmentComponent,
    RadioCartPageComponent,
    RadioPaymentMethodComponent
  ],
  imports: [
    CommonModule,
    BookAppointmentRoutingModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    NgbModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTooltipModule,
    MatTableModule,
    SharedModule,
    ComponentsModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectFilterModule,
    NgxPaginationModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
  ]
})
export class BookAppointmentModule { }
