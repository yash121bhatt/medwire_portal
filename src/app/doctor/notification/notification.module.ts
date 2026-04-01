import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSortModule } from '@angular/material/sort';
import { OwlDateTimeModule,OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationListComponent } from './notification-list/notification-list.component';


@NgModule({
  declarations: [
    NotificationFormComponent,
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    PerfectScrollbarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),}),
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    NgbModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatStepperModule,
    MatSliderModule,
    ChartsModule,
    NgxDatatableModule,
    MaterialFileInputModule,
    FullCalendarModule,
    ChartsModule,
    MatExpansionModule,
    MatSelectFilterModule,
    MatSortModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class NotificationModule { }
