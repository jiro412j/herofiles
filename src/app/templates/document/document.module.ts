import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {DocumentRoutingModule} from './document-routing.module';
import {DocumentCategoryComponent} from './document-category/document-category.component';
import { DocumentFilterComponent } from './document-filter/document-filter.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DocumentRoutingModule
  ],
  declarations: [
    DocumentCategoryComponent,
    DocumentFilterComponent,
    DocumentListComponent,
    DocumentUploadComponent
  ]
})
export class DocumentModule {
}
