import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/primeng';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentCategoryComponent } from './document-category/document-category.component';
import { DocumentFilterComponent } from './document-filter/document-filter.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentImportComponent } from './document-import/document-import.component';
import { DocumentService } from './document.service';
import { HttpClientService } from '../../shared/http-client.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DocumentRoutingModule,
    NgbModule,
    DropdownModule
  ],
  declarations: [
    DocumentCategoryComponent,
    DocumentFilterComponent,
    DocumentListComponent,
    DocumentImportComponent
  ],
  providers: [
    DocumentService,
    HttpClientService
  ]
})
export class DocumentModule {
}
