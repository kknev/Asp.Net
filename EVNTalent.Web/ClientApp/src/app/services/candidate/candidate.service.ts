import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private url: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + "api/candidate";
  }

  loadAll() {
    return this.http.get(this.url + "/all");
  }
  loadSort(_param: any) {
    return this.http.get(this.url + `/sort?query=${_param[1]}%20${_param[2]}`);
  }
  loadFilter(_param: any) {
    return this.http.get(this.url + "/filter", _param);
  }

}
