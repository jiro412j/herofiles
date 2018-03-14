import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentCategoryComponent } from './document-category/document-category.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';

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
        component: DocumentUploadComponent
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
