import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentCategoryComponent } from './document-category/document-category.component';
import { DocumentImportComponent } from './document-import/document-import.component';
import { DocumentListComponent } from './document-list/document-list.component';

export const documentRoutes: Routes = [
  {
    path: 'document',
    children: [
      {
        path: 'category',
        component: DocumentCategoryComponent
      },
      {
        path: 'import',
        component: DocumentImportComponent
      },
      {
        path: 'list/:id',
        component: DocumentListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(documentRoutes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {
}
