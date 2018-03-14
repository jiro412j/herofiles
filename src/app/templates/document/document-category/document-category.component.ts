import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-category',
  templateUrl: './document-category.component.html',
  styleUrls: ['./document-category.component.scss']
})
export class DocumentCategoryComponent implements OnInit {

  categories: Object;

  constructor(private docService: DocumentService) {
  }

  ngOnInit() {
    this.getDocumentType();
  }

  getDocumentType() {
    this.docService.getDocumentType().subscribe(
        (documents: any) => {
          console.log(documents.results);
          this.categories = documents.results;
        }
    );
  }

}
