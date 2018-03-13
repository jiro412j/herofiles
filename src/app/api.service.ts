import { Injectable } from '@angular/core';
import { API_URL } from './shared/api.constant';
import {AppService} from './app.service';

@Injectable()
export class ApiService {

  constructor(private http: AppService) {
  }

  getTable() {
    return this.http.get(API_URL.table);
  }
}