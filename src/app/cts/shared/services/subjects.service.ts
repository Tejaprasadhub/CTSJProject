import { Injectable } from '@angular/core';
import { Subjects } from '../models/subjects';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectsService {
    public subjects: Subjects[] =
        [
            {
                "id": 1,
                "code": "ENSH",
                "name": "English",
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
              "id": 1,
              "code": "MTHS",
              "name": "Maths",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
            {
              "id": 1,
              "code": "CHEM",
              "name": "Chemistry",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
        ];

    private subjectsJsonData = new BehaviorSubject<any>(null);
    public subjectsJson = this.subjectsJsonData.asObservable();

    constructor() { }
    public getSubjects() {
        this.subjectsJsonData.next(this.subjects);
    }
}
