import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/http-client.service';
import { API_URL } from '../../shared/api.constant';

@Injectable()
export class DocumentService {

  constructor(private http: HttpClientService ) {

  }

  getDocumentType() {
    return this.http.get(API_URL.document_setting);
  }

  importDocument(document) {
    return this.http.post(API_URL.import_document, document);
  }

}
