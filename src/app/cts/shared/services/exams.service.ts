import { Injectable } from '@angular/core';
import { Exams } from '../models/exams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExamsService {
    public exams: Exams[] =
        [
            {
                "id": 1,
                "title": "English",
                "year": 2019,
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
                "id": 2,
                "title": "Maths",
                "year": 2019,
                "createddate": new Date("11/10/2019"),
                "createdby": "Sindhuja"
            },
            {
                "id": 3,
                "title": "Science",
                "year": 2019,
                "createddate": new Date("12/10/2019"),
                "createdby": "sindhuja"
            },
        ];

    private examsJsonData = new BehaviorSubject<any>(null);
    public examsJson = this.examsJsonData.asObservable();

    constructor() { }
    public getExams() {
        this.examsJsonData.next(this.exams);
    }
}
