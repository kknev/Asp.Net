import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deparment } from '../fragments/filter/filter.component';
import { CandidateService } from '../services/candidate/candidate.service';
import { DepartmentService } from '../services/candidate/department.service';
import { ErrorService } from '../services/errors/error.service';


@Component({
  selector: 'app-candidate-add-edit-form',
  templateUrl: './candidate-add-edit-form.component.html',
  styles: [
  ]
})
export class CandidateAddEditFormComponent implements OnInit {
  createForm: FormGroup;
  departments: Deparment[] = [];
  id: string;
  isEditMode: boolean = false;
  url: string;
  loading = false;
  successfulSave: boolean = false;
  _errors = this.errService.newError();

  constructor(private router: Router,
    private activateRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private departmentService: DepartmentService,
    private errService: ErrorService,
    private fb: FormBuilder) {
    this.id = this.activateRoute.snapshot.params['id'];
    this.createForm = this.OnIt();
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.departmentService.loadAll().subscribe(data => this.departments = data['departmentList'])
    this.isEditMode = this.id != undefined && this.id.length > 0;
    this.isEditMode
      ? this.candidateService.loadCandidate(this.id).subscribe(result => {
        //  console.log(result)
        this.createForm.setValue(result['candidate']);
      })
      : this.createForm = this.OnIt();
  }
  OnIt = () => this.fb.group({
    'id': [null, Validators.required],
    'firstName': [null, Validators.required],
    'middleName': [null, Validators.required],
    'lastName': ['', Validators.required],
    'departmentName': ['Select...', Validators.required],
    'birthDate': [null, Validators.required],
    'education': ['', Validators.required],
    'code': [null, Validators.required],
    'score': [0, Validators.required],
  });

  onCreate() {
    this._errors = this.errService.newError();;
    this.createForm.value['birthDate']
      ? null
      : this.createForm.value['birthDate'] = '1969-01-01';
    if (!this.isEditMode) {
      this.candidateService.createCandidate(this.createForm.value)
        .subscribe(data => {
          console.log(data["id"])
          this.successfulSave = true;
          this.router.navigate(['/details/' + data['id']])
        }, err => {
          console.log(err)
          this.successfulSave = false;
          if (err.status === 400) {
            this._errors = this.errService.getCreateErrors(err.error.errors);
          } else {
            this._errors = this.errService.getFatalError(err);
          }
        });
    } else {
      this.candidateService.editCandidate(this.id, this.createForm.value)
        .subscribe(data => {
          this.successfulSave = true;
          this.router.navigate(['/details/' + [data['id']]])
        }
          , err => {
            this.successfulSave = false;
            this._errors = this.errService.getUpdateErrors(err.error);
          });
    }
  }



  get firstName() { return this.createForm.get('firstName'); }
  get middleName() { return this.createForm.get('firstName'); }
  get lastName() { return this.createForm.get('lastName'); }
  get departmentName() { return this.createForm.get('departmentName'); }
  get birthDate() { return this.createForm.get('birthDate'); }
  get education() { return this.createForm.get('education'); }
  get score() { return this.createForm.get('score'); }
}

