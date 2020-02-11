import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
    this.headers.append('Content-Type', 'application/json;charset=utf=8');
    this.headers.append('Accept', 'application/json;charset=utf=8, */*');
  }

  async GET<T>(url: string, data: any = {}) {
    if (data) {
      data.format = 'json';
    } else {
      data = {};
      data.format = 'json';
    }
    return await this.http.get<T>(url, {headers: this.headers, params: data});
  }

  async POST<T>(url: string, data: any) {
    if (data) {
      data.format = 'json';
    } else {
      data = {};
      data.format = 'json';
    }
    return await this.http.post<T>(url, data, {headers: this.headers});
  }

  async PUT<T>(url: string, data: any) {
    if (data) {
      data.format = 'json';
    } else {
      data = {};
      data.format = 'json';
    }
    return await this.http.put<T>(url, data, {headers: this.headers});
  }

  async DELETE<T>(url: string) {
    return await this.http.delete<T>(url, {headers: this.headers});
  }

  async POSTFORMDATA<T>(url: string, data: FormData) {
    return await this.http.post<T>(url, data, {headers: this.headers});
  }

  async PUTFORMDATA<T>(url: string, data: FormData) {
    return await this.http.put<T>(url, data, {headers: this.headers});
  }
}
