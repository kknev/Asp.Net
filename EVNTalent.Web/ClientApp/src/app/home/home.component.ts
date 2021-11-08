import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateShrotView } from '../models/Candidate';
import { CandidateService } from '../services/candidate/candidate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public users: CandidateShrotView[] = [];
  // columnDefs = [

  //   { headerName: 'Full Name', field: 'fullName', sortable: true, filter: true },
  //   { headerName: 'Department', field: 'departmentName', sortable: true, filter: true },
  //   { headerName: 'Educaton', field: 'education', sortable: true, filter: true },
  //   { headerName: 'Score', field: 'score', sortable: true, filter: true },
  //   { headerName: 'Birth Date', field: 'birthDate', sortable: true },
  //   { headerName: 'Code', field: 'code', sortable: true },
  //   { headerName: 'Options', field: 'options' }
  // ];
  // defaultColDef = {
  //   flex: 1,
  //   minWidth: 100,
  // };
  // rowSelection = 'single';

  rowData = [];
  constructor(

    private activateRouter: ActivatedRoute,
    private candidateService: CandidateService,
  ) {
  }

  ngOnInit(): void {
    this.activateRouter.queryParams.subscribe(params => {
      let _param = [];
      params["query"] === undefined
        ? _param.push("NaN")
        : _param = (params["query"].split(" "));

      switch (_param[0]) {
        case 'sort':
          this.candidateService.loadSort(_param)
            .subscribe(result => {
              console.log(result)
              this.users = result['candidates']
            });
          break;
        case 'filter':
          this.candidateService.loadFilter(JSON.parse(_param[1]))
            .subscribe(result => {
              this.users = result['candidates']
            })
          break;
        default:
          this.candidateService.loadAll()
            .subscribe(result => {
              console.log(result)
              this.rowData = result['candidates'];
              this.users = result['candidates'];
            });
          break;
      }
    })
  }
  onDelete(id: string) {

    if (!id) {
      alert('No identifer');
    }
    var x = confirm("Are you sure you want to delete?");

    if (x) {

      this.candidateService.delete(id)
        .subscribe(result => {
          console.log('Result from action delete: ' + result)
          this.candidateService.loadAll().subscribe(result => {
            console.log(result)
            this.users = result['candidates'];
          })
        });
    }

  }
}



