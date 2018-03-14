import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-import',
  templateUrl: './document-import.component.html',
  styleUrls: ['./document-import.component.scss']
})
export class DocumentImportComponent implements OnInit {

  documentType = [];
  selectedType: object;
  description: string;
  selectedPriority = 0;
  file: File;
  documentFile: File;
  documentDate: NgbDateStruct;
  priorityType = [
    {
      label: 'Normal',
      value: 0
    },
    {
      label: 'Important',
      value: 1
    }
  ];

  constructor(private dateFormat: NgbDateParserFormatter,
              private router: Router,
              private docService: DocumentService) {
  }

  ngOnInit() {
    this.loadInputData();
  }

  loadInputData() {
    this.docService.getDocumentType().subscribe(
        (documents: any) => {
          _.forEach(documents.results, (data) => {
            this.documentType.push({
              label: data.type_name,
              value: {
                id: data.id,
                type_name: data.type_name,
              }
            });
          });
        }
    );
  }

  selectFile(file) {
    this.documentFile = file.target.files[0];
  }

  upload() {
    // const document = new FormData();
    // document.append('document_file', this.documentFile);
    // document.append('document_date', this.dateFormat.format(this.documentDate));
    // document.append('description', this.description);
    // document.append('priority', _.toString(this.selectedPriority));
    // document.append('document_type', _.get(this.selectedType, 'id'));
    // this.docService.importDocument(document).subscribe(
    //     data => {
    //       console.log('success');
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    // );
    this.router.navigate(['/document', 'list', _.get(this.selectedType, 'id')]);
  }
}
