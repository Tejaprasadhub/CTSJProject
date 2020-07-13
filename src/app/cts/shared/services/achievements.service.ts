import { Injectable } from '@angular/core';
import { Achievements } from '../models/achievements';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AchievementsService {
    public achievements: Achievements[] =
        [
            {
                "id": 1,              
                "title":"Ganesh chandra",
                "date":"10/10/2019",
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
              "id": 1,              
              "title":"teja prasad",
              "date":"10/10/2019",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
            {
              "id": 1,              
              "title":"rajesh",
              "date":"10/10/2019",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
        ];

    private achievementsJsonData = new BehaviorSubject<any>(null);
    public achievementsJson = this.achievementsJsonData.asObservable();

    constructor() { }
    public getAchievements() {
        this.achievementsJsonData.next(this.achievements);
    }
}

