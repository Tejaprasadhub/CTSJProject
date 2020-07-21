import { Injectable } from '@angular/core';
import { Timetable } from '../models/timetable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimetableService {
    public timetable: Timetable[] =
        [
            {
                "id": 1,
                "classid": 1,
                "subjectid": 1,
                "teacherid": 1,
                "periodfrom": new Date("10/10/2019"),
                "periodto": new Date("10/10/2019"),
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
              "id": 2,
              "classid": 1,
              "subjectid": 1,
              "teacherid": 1,
              "periodfrom": new Date("10/10/2019"),
              "periodto": new Date("10/10/2019"),
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
            {
              "id": 3,
              "classid": 1,
              "subjectid": 1,
              "teacherid": 1,
              "periodfrom": new Date("10/10/2019"),
              "periodto": new Date("10/10/2019"),
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
        ];

    private timetableJsonData = new BehaviorSubject<any>(null);
    public timetableJson = this.timetableJsonData.asObservable();

    constructor() { }
    public getTimetable() {
        this.timetableJsonData.next(this.timetable);
    }
}
