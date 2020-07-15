import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app-constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleAccessService {
  constructor(private httpClient : HttpClient) { }

  UserFeatures(){
    const headers = new HttpHeaders().set("Content-Type","application/json");
   
    var  loginUrl:string = AppConstants.Api.security+"AccessToken/UserFeatures"

    return this.httpClient.post
    (loginUrl,{headers:headers,withCredentials:true}).pipe(
    map((response:any)=> {
       return response.table1;
    })); 
  }
}
