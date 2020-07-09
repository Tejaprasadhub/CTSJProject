import { Injectable } from '@angular/core';
import { Classes } from '../models/classes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {
    public classes: Classes[] =
        [
            {
                "id": 1,
                "name": "4th",
                "noofsections": 2,
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
                "id": 2,
                "name": "5th",
                "noofsections": 1,
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            },
            {
                "id": 3,
                "name": "10th",
                "noofsections": 3,
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            },
        ];

    private classesJsonData = new BehaviorSubject<any>(null);
    public classesJson = this.classesJsonData.asObservable();

    constructor() { }
    public getClasses() {
        this.classesJsonData.next(this.classes);
    }
}
