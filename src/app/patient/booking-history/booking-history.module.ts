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

import { BookingHistoryRoutingModule } from './booking-history-routing.module';
import { ClinicHistoryComponent } from './clinic-history/clinic-history.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LaboratoryHistoryComponent } from './laboratory-history/laboratory-history.component';
import { RadiologyHistoryComponent } from './radiology-history/radiology-history.component';


@NgModule({
  declarations: [
    ClinicHistoryComponent,
    LaboratoryHistoryComponent,
    RadiologyHistoryComponent
  ],
  imports: [
    CommonModule,
    BookingHistoryRoutingModule,
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
  ]
})
export class BookingHistoryModule { }
