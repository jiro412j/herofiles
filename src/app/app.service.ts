import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class AppService {

  headers;

  constructor(private http: HttpClient) {
      this.headerFunction();
  }
  headerFunction() {
    this.headers = new HttpHeaders().set('Authorization', 'JWT' + ' ' + localStorage.getItem('user'));
  }

  post(url, data) {
    return this.http.post(url, data, {headers: this.headers});
  }

  get(url, params?) {
    return this.http.get(url, {params: params, headers: this.headers});
  }

  put(url, data) {
    this.headerFunction();
    return this.http.put(url, data, {headers: this.headers});
  }

  patch(url, data) {
    this.headerFunction();
    return this.http.patch(url, data, {headers: this.headers});
  }

  delete(url) {
    this.headerFunction();
    return this.http.delete(url, {headers: this.headers});
  }
}