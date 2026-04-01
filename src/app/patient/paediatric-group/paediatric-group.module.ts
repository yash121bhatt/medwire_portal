import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";

import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SharedModule } from "../../shared/shared.module";
import {MatSliderModule} from '@angular/material/slider';
// import { ApexchartComponent } from "../charts/apexchart/apexchart.component";
import { ChartsModule  } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { PaediatricGroupRoutingModule } from './paediatric-group-routing.module';
import { CgTrackerComponent } from './cg-tracker/cg-tracker.component';
import { AddChildComponent } from './add-child/add-child.component';
import { VaccinationScheduleComponent } from './vaccination-schedule/vaccination-schedule.component';
import { AddNewBabyComponent } from './add-new-baby/add-new-baby.component';
import { MilestoneTrackerComponent } from './milestone-tracker/milestone-tracker.component';

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { EditBabyComponent } from './edit-baby/edit-baby.component';
import { BabyGrowthViewListComponent } from './baby-growth-view-list/baby-growth-view-list.component';
import { VaccinationUpdateComponent } from './vaccination-update/vaccination-update.component';

@NgModule({
  declarations: [
    CgTrackerComponent,
    AddChildComponent,
    VaccinationScheduleComponent,
    AddNewBabyComponent,
    MilestoneTrackerComponent,
    EditBabyComponent,
    BabyGrowthViewListComponent,
    VaccinationUpdateComponent
  ],
  imports: [
    CommonModule,
    PaediatricGroupRoutingModule,
    PerfectScrollbarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),}),
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    

  ],
})
export class PaediatricGroupModule { }
