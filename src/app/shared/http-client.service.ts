import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpClientService {

  headers;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Authorization', 'JWT' + ' ' + localStorage.getItem('user'));
  }

  get(url, params?) {
    return this.http.get(url, {params: params, headers: this.headers});
  }

  post(url, data) {
    return this.http.post(url, data, {headers: this.headers});
  }

  put(url, data, params?) {
    return this.http.put(url, data, {params: params, headers: this.headers});
  }

  patch(url, data) {
    return this.http.patch(url, data, {headers: this.headers});
  }

  delete(url) {
    return this.http.delete(url, {headers: this.headers});
  }
}
