import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styles: [
  ]
})
export class CandidateDetailsComponent implements OnInit {

  id: string = "";
  user = new ClassUser;

  constructor(private activateRouter: ActivatedRoute,
    private router: Router, private candidateService: CandidateService,
    private activateRoute: ActivatedRoute,
  ) {
    this.id = this.activateRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];

    this.candidateService.loadCandidate(this.id)
      .subscribe(result => {
        console.log(result);
        this.user = result['candidate'];
      });
  }
  onDelete() {
    this.candidateService.delete(this.id)
      .subscribe(result => {
        console.log('Result from action delete: ' + result)
        this.router.navigate(['/']);
      })
  }

}

export class ClassUser {
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.middleName = "";
    this.id = "";
    this.departmentName = "";
    this.education = "";
    this.birthDate = new Date("1978-02-03");
    this.user = "";
    this.isOwner = false;
    this.score = 0;
    this.isDeleted = false;
  }
  firstName: string;
  lastName: string;
  middleName: string;
  id: string;
  departmentName: string;
  education: string;
  birthDate: Date;
  score: number;
  user: string;
  isOwner: boolean;
  isDeleted: boolean;
}