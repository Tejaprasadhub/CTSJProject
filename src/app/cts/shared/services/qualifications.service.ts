import { Injectable } from '@angular/core';
import { Qualifications } from '../models/qualifications';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QualificationsService {
    public qualifications: Qualifications[] =
        [
            {
                "id": 1,
                "code": "BED",
                "title": "B.ED",
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
              "id": 1,
              "code": "BED",
              "title": "B.ED",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
            {
              "id": 1,
              "code": "BED",
              "title": "B.ED",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
        ];

    private qualificationsJsonData = new BehaviorSubject<any>(null);
    public qualificationsJson = this.qualificationsJsonData.asObservable();

    constructor() { }
    public getQualifications() {
        this.qualificationsJsonData.next(this.qualifications);
    }
}
