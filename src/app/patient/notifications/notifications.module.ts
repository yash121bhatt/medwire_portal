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
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatRadioModule } from "@angular/material/radio";
import { NotificationsRoutingModule } from './notifications-routing.module';
import { MedicineNtfctnComponent } from './medicine-ntfctn/medicine-ntfctn.component';
import { MedicineReminderComponent } from './medicine-reminder/medicine-reminder.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { MatStepperModule } from "@angular/material/stepper";
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { LabTestDetailComponent } from './lab-test-detail/lab-test-detail.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { PreMedicineNotificationComponent } from './pre-medicine-notification/pre-medicine-notification.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {MatSortModule} from '@angular/material/sort';
import { LabTestMemberComponent } from './lab-test-member/lab-test-member.component';
import { BookAppointmentMemberComponent } from './book-appointment-member/book-appointment-member.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from "ng-pick-datetime";

@NgModule({
  declarations: [
  
    MedicineNtfctnComponent,
       MedicineReminderComponent,
       LabTestComponent,
       BookAppointmentComponent,
       LabTestDetailComponent,
       AppointmentDetailComponent,
       PreMedicineNotificationComponent,
       LabTestMemberComponent,
       BookAppointmentMemberComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    NgxDatatableModule ,
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
    ComponentsModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTooltipModule,
    MatTableModule,
    SharedModule,
    MatStepperModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    MatSortModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
    
  ]
})
export class NotificationsModule { }
