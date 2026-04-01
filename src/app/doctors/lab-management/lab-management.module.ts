import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import {MatChipsModule} from '@angular/material/chips';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatSelectFilterModule } from 'mat-select-filter';
import { MaterialFileInputModule } from "ngx-material-file-input";
import { ComponentsModule } from "src/app/shared/components/components.module";

import { LabManagementRoutingModule } from './lab-management-routing.module';
import { LabListComponent } from './lab-list/lab-list.component';
import { LaboraroryFormComponent } from './laborarory-form/laborarory-form.component';
import { AddLaborateryComponent } from './add-laboratery/add-laboratery.component';


@NgModule({
  declarations: [
    LabListComponent,
    LaboraroryFormComponent,
    AddLaborateryComponent
  ],
  imports: [
    CommonModule,
    chartjsModule, 
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    DragDropModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    NgxDatatableModule,
    MatStepperModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    MatChipsModule,
    CKEditorModule,
    MatSelectFilterModule,
    MaterialFileInputModule,
    LabManagementRoutingModule
  ]
})
export class LabManagementModule { }
