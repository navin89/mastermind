import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly domain: string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  getProductData() {
    return this.http.get(`${this.domain}/api/products`);
  }

  getTestIp() {
    return this.http.get(`${this.domain}/test-ip`);
  }
}
