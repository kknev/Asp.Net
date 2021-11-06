import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deparment } from '../fragments/filter/filter.component';


@Component({
  selector: 'app-candidate-add-edit-form',
  templateUrl: './candidate-add-edit-form.component.html',
  styles: [
  ]
})
export class CandidateAddEditFormComponent implements OnInit {
  createForm: FormGroup;
  departments: Deparment[] = [];
  id:string;
  isEditMode: boolean=false;
  url: string;
  loading = false;
  successfulSave: boolean = false;
  errors = new GetError();

  constructor(private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http:HttpClient,
    @Inject('BASE_URL') baseUrl: string
    ) {
      this.url = baseUrl+"api"
      this.id = this.activateRoute.snapshot.params['id'];
    
      this.createForm =this.OnIt();
  }
  
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.http.get(this.url + "/department/all").subscribe(data => this.departments = data['departmentList'])
    this.isEditMode=this.id!=undefined && this.id.length>0;
  
this.isEditMode
 ? this.http.get(this.url + "/candidate/"+this.id).subscribe(result=>{
    this.createForm.setValue(result);
})
: this.createForm=this.OnIt();
  }
OnIt=()=>  this.fb.group({
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

//   onCreate() {
//     this.createForm.value['birthDate']
//       ? null
//       : this.createForm.value['birthDate'] = '1969-01-01';

//       if (this.isCreateMode){
//         this.userService.create(this.createForm.value)
//           .subscribe(
//             data =>{ 
//               this.router.navigate(['/details/'+data['id']])
//             }
//               ,
//             err => {
    
//               this.successfulSave = false;
    
    
//               if (err.status === 400) {
//                console.log(err.error.errors);
//                 this.errors.FirstName = err.error.errors['FirstName']?? [];
//                 this.errors.MiddleName = err.error.errors['MiddleName']?? [];
//                 this.errors.LastName = err.error.errors['LastName']?? [];
//                 this.errors.DepartmentName = err.error.errors['DepartmentName']?? [];
//                 this.errors.BirthDate = err.error.errors['BirthDate']?? [];
//                 this.errors.Score = err.error.errors['Score']?? [];
    
//               } else {
//                  this.errors.Fatal.push("Something went wrong!"+err);
//               }
//             }
//           )
//       }else{

//         console.log("Update")
//         this.userService.update(this.id, this.createForm.value)
//         .subscribe(
//           data =>{ 
//             console.log(data);
//             this.successfulSave = true;
//    this.successfulSave?  this.router.navigate(['details/'+this.id])
//    :this.errors.Fatal.push("Something went wrong!") ;
//           }
//           , err => {
//               this.successfulSave = false;
//             if (err.status === 400 ) {
//               console.log(err.error);
// this.errors=new GetError();
//               // this.errors.FirstName =  [];
//               // this.errors.MiddleName =  [];
//               // this.errors.LastName =  [];
//               // this.errors.DepartmentName =  [];
//               // this.errors.BirthDate =  [];
//               // this.errors.Score =  [];
  

//   for (const e of err.error) {
//     switch(e['propertyName']){
//          case'FirstName': this.errors.FirstName.push(e['errorMessage']);break;
//          case'MiddleName':this.errors.MiddleName.push(e['errorMessage']);break;
//          case'LastName':this.errors.LastName.push(e['errorMessage']);break;
//          case'DepartmentName':this.errors.DepartmentName .push(e['errorMessage']);break;
//          case'BirthDate':this.errors.BirthDate.push(e['errorMessage']);break;
//          case'Education':this.errors.Score.push(e['errorMessage']);break;
//          case'Score':this.errors.Score.push(e['errorMessage']);break;

//     }
//    }
//             } else {
//                this.errors.Fatal.push("Something went wrong!"+err.error);
//             }
//           }
//         )
//       }


//   }
onCreate(){}

  get firstName() { return this.createForm.get('firstName'); }
  get middleName() { return this.createForm.get('firstName'); }
  get lastName() { return this.createForm.get('lastName'); }
  get departmentName() { return this.createForm.get('departmentName'); }
  get birthDate() { return this.createForm.get('birthDate'); }
  get education() { return this.createForm.get('education'); }
  get score() { return this.createForm.get('score'); }
}


export class GetError {

  constructor() {
    this.FirstName = [];
    this.MiddleName = [];
    this.LastName = [];
    this.DepartmentName = [];
    this.BirthDate = [];
    this.Education = [];
    this.Score = [];
    this.Fatal=[];
  }
  FirstName: string[];
  MiddleName: string[];
  LastName: string[];
  DepartmentName: string[];
  BirthDate: string[];
  Education: string[];
  Score: string[];
  Fatal:string[];
}