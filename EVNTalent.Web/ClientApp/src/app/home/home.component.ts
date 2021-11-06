import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public users: User[] = [];
  private url: string;
  
  constructor(
    private activateRouter: ActivatedRoute,
    private http:HttpClient,
    @Inject('BASE_URL') baseUrl: string
    // private candidateService: CandidateService
    ) {
      this.url = baseUrl+"api/candidate"
  }

  ngOnInit(): void {
  
    this.activateRouter.queryParams.subscribe(params => {
            let _param = [];
      params["query"] === undefined
        ? _param.push("NaN")
        : _param = (params["query"].split(" "));

      switch (_param[0]) {
        case 'sort':
          this.http.get(this.url +`/sort?query=${_param[1]}%20${_param[2]}`)
          // this.candidateService.sort({isMine:_param[1], name: _param[2], arrow: _param[3] })
            .subscribe(result => {
              console.log(result)
            //  this.users = result
            });
          break;
        case 'filter':
          this.http.post(this.url + "/filter", JSON.parse(_param[1]))
        //  this.candidateService.filter(JSON.parse(_param[1]))
          .subscribe(result => {

            console.log(result)
            // this.users = result;
          })
          break;
        default:
        //  this.candidateService.getAll()
        console.log("On Loading")
        this.http.get(this.url + "/all").subscribe(result => {
            
            console.log(result)
            this.users = result['candidates'];
          });

          break;
      }

    })
  }

}


export interface User {
  id: number;
  fullName: string;
  departmentName: string;
  code: string;
  education: string;
  birthDate: Date;
  score: string;
  isDelete:boolean;
}