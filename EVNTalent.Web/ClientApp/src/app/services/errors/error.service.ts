import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  newError() {
    return {
      FirstName: [],
      MiddleName: [],
      LastName: [],
      DepartmentName: [],
      BirthDate: [],
      Education: [],
      Score: [],
      Fatal: [],
    }
  }
  getCreateErrors(_errors: any) {
    return {
      FirstName: _errors['FirstName'] ? _errors['FirstName'] : [],
      MiddleName: _errors['MiddleName'] ? _errors['MiddleName'] : [],
      LastName: _errors['LastName'] ? _errors['LastName'] : [],
      DepartmentName: _errors['DepartmentName'] ? _errors['DepartmentName'] : [],
      Education: _errors['Education'] ? _errors['Education'] : [],
      BirthDate: _errors['BirthDate'] ? _errors['BirthDate'] : [],
      Score: _errors['Score'] ? _errors['Score'] : [],
      Fatal: [],
    }
  }
  getUpdateErrors(_errors: any) {

    let errors = this.newError();
    for (const e of _errors) {
      switch (e['propertyName']) {
        case 'FirstName': errors.FirstName.push(e['errorMessage']); break;
        case 'MiddleName': errors.MiddleName.push(e['errorMessage']); break;
        case 'LastName': errors.LastName.push(e['errorMessage']); break;
        case 'DepartmentName': errors.DepartmentName.push(e['errorMessage']); break;
        case 'BirthDate': errors.BirthDate.push(e['errorMessage']); break;
        case 'Education': errors.Education.push(e['errorMessage']); break;
        case 'Score': errors.Score.push(e['errorMessage']); break;

      }
    }
    return errors;
  }
  getFatalError(_errors) {
    let errors = this.newError();
    errors.Fatal.push("Fatal Error")
    return errors;
  }
}
