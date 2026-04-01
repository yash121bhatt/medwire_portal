import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryItemsRoutingModule } from './laboratory-items-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatStepperModule } from '@angular/material/stepper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { TestListComponent } from './test-list/test-list.component';
import { AddTestComponent } from './add-test/add-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { PackageListComponent } from './package-list/package-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { EditPackageComponent } from './edit-package/edit-package.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    TestListComponent,
    AddTestComponent,
    EditTestComponent,
    PackageListComponent,
    AddPackageComponent,
    EditPackageComponent
  ],
  imports: [
    CommonModule,
    LaboratoryItemsRoutingModule,
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
    MatProgressSpinnerModule,
    ComponentsModule,
    NgxDatatableModule,
    MatStepperModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    CKEditorModule
  ]
})
export class LaboratoryItemsModule { }
