import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Deparment } from 'src/app/models/Deparment';
import { FilterForm, FilterResult } from 'src/app/models/Filter';
import { DepartmentService } from 'src/app/services/candidate/department.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [
  ]
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;
  public departments: Deparment[] = [];

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group(FilterForm());

  }

  ngOnInit(): void {
    this.departmentService.loadAll()
      .subscribe(data => {
        //        console.log(data);
        this.departments = data['departmentList'];
      })
  }
  onFilter() {
    this.router.navigate(['/'], { queryParams: { "query": "filter " + JSON.stringify(FilterResult(this.filterForm.value)) } });
  }


  get name() { return this.filterForm.get('name') }
  get department() { return this.filterForm.get('department') }
  get education() { return this.filterForm.get('education') }
  get score() { return this.filterForm.get('score') }
  get arrowScore() { return this.filterForm.get('arrowScore') }
  get birthYaer() { return this.filterForm.get('birthYaer') }
  get arrowBirth() { return this.filterForm.get('arrowBirth') }

  get nameSort() { return this.filterForm.get('nameSort') }
  get departmentSort() { return this.filterForm.get('departmentSort') }
  get educationSort() { return this.filterForm.get('educationSort') }
  get scoreSort() { return this.filterForm.get('scoreSort') }
  get birthYearSort() { return this.filterForm.get('birthYearSort') }

}

