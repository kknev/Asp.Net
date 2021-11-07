import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + "api/department";
  }
  loadAll() {
    return this.http.get(this.url + "/all")
  }
}
