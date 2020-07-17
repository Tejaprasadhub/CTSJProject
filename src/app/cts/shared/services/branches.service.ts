import { Injectable } from '@angular/core';
import { Branches } from '../models/branches';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app-constants';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BranchesService {

    private branchesJsonData = new BehaviorSubject<any>(null);
    public branchesJson = this.branchesJsonData.asObservable();

    constructor(private httpClient : HttpClient) { }
    public getBranches() {
        // this.branchesJsonData.next(this.branches);
        const headers = new HttpHeaders().set("Content-Type","application/json");
   
    var  loginUrl:string = AppConstants.Api.AdminApp+"Branches"

    return this.httpClient.get
    (loginUrl,{headers:headers,withCredentials:true}).pipe(
    map((response:any)=> {
       return response;
    })); 
    }
}

