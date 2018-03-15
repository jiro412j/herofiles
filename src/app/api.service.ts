import { Injectable } from '@angular/core';
import { API_URL } from './shared/api.constant';
import { HttpClientService } from './shared/http-client.service';

@Injectable()
export class ApiService {

  constructor(private http: HttpClientService) {
  }

  getTable(params?) {
    return this.http.get(API_URL.table, params);
  }

  deleteFields(id) {
    return this.http.delete(API_URL.field + id + '/');
  }

  postTable(data) {
    return this.http.post(API_URL.table, data);
  }

  getField() {
    return this.http.get(API_URL.field);
  }

  putField(id, data) {
    return this.http.put(API_URL.table + id + '/', data);
  }


  postField(projectTitle) {
    return this.http.post(API_URL.field, projectTitle);
  }

  login(username, password) {
    return this.http.post(API_URL.login, {username: username, password: password});
  }

  logout() {
    localStorage.removeItem('user');
  }
}