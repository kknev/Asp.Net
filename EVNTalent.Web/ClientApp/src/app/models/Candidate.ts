import { Validators } from "@angular/forms";

export function CandidateCreateForm() {
    return {
        'id': [null, Validators.required],
        'firstName': [null, Validators.required],
        'middleName': [null, Validators.required],
        'lastName': ['', Validators.required],
        'departmentName': ['Select...', Validators.required],
        'birthDate': [null, Validators.required],
        'education': ['', Validators.required],
        'code': [null, Validators.required],
        'score': [0, Validators.required],
    }
}
export class Candidate {
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

export interface CandidateShrotView {
    id: number;
    fullName: string;
    departmentName: string;
    code: string;
    education: string;
    birthDate: Date;
    score: string;
    isDelete: boolean;
}