import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';

import { PromocodeRoutingModule } from './promocode-routing.module';
import { PromocodeFormComponent } from './promocode-form/promocode-form.component';
import { PromocodeListComponent } from './promocode-list/promocode-list.component';


@NgModule({
  declarations: [
    PromocodeFormComponent,
    PromocodeListComponent
  ],
  imports: [
    CommonModule,
    PromocodeRoutingModule,
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
    MatSortModule
  ]
})
export class PromocodeModule { }
