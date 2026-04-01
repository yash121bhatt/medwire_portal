import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { AddTestComponent } from './add-test/add-test.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditPackageComponent } from './edit-package/edit-package.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { PackageListComponent } from './package-list/package-list.component';
import { TestListComponent } from './test-list/test-list.component';

const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent
  },
  {
    path: 'add-category' ,
    component: AddCategoryComponent
  },
  {
    path: 'edit-category/:catid' ,
    component: EditCategoryComponent
  },
  {
    path: 'test-list' , 
    component: TestListComponent
  },
  {
    path: 'add-test' ,
    component: AddTestComponent
  },
  {
    path: 'edit-test/:testId' ,
    component: EditTestComponent
  },
  {
    path: 'package-list' , 
    component: PackageListComponent
  },
  {
    path: 'add-package' , 
    component: AddPackageComponent
  },
  {
    path: 'edit-package/:packageId' ,
    component: EditPackageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryItemsRoutingModule { }
