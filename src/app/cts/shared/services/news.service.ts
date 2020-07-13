import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    public news: News[] =
        [
            {
                "id": 1,
                "title": "acheivement",
                "branchid": 2,
                "description":"he acheived something",
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
              "id": 1,
              "title": "acheivement",
              "branchid": 3,
              "description":"he acheived something",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
            {
              "id": 1,
              "title": "acheivement",
              "branchid": 4,
              "description":"he acheived something",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
        ];

    private newsJsonData = new BehaviorSubject<any>(null);
    public newsJson = this.newsJsonData.asObservable();

    constructor() { }
    public getNews() {
        this.newsJsonData.next(this.news);
    }
}
