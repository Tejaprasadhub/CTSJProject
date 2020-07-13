import { Injectable } from '@angular/core';
import { Branches } from '../models/branches';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BranchesService {
    public branches: Branches[] =
        [
            {
                "id": 1,
                "code": "skta",
                "title":"srungavarapukota",
                "createddate": new Date("10/10/2019"),
                "createdby": "Sindhuja"
            }, {
              "id": 1,
              "code": "bddm",
              "title":"boddam",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
            {
              "id": 1,
              "code": "vskp",
              "title":"visakhapatnam",
              "createddate": new Date("10/10/2019"),
              "createdby": "Sindhuja"
            },
        ];

    private branchesJsonData = new BehaviorSubject<any>(null);
    public branchesJson = this.branchesJsonData.asObservable();

    constructor() { }
    public getBranches() {
        this.branchesJsonData.next(this.branches);
    }
}

