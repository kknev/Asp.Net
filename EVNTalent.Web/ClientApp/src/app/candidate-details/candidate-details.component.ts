import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../models/Candidate';
import { CandidateService } from '../services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styles: [
  ]
})
export class CandidateDetailsComponent implements OnInit {

  id: string = "";
  user = new Candidate;

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
    if (!this.id) {
      alert('No identifer');
    }
    var x = confirm("Are you sure you want to delete?");

    if (x) {

      this.candidateService.delete(this.id)
        .subscribe(result => {
          console.log('Result from action delete: ' + result)
          this.router.navigate(['/'])
        });
    }


  }
}
