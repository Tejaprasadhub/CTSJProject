import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  submitUserAccessDetails(loginUserData){
    const headers = new HttpHeaders().set("Content-Type","application/json");
    let data=JSON.stringify({
      UserName:loginUserData.userName,
      Password:loginUserData.password
    });
    var  loginUrl:string = "http://localhost:64341/api/"+"AccessToken/ValidateUser"

    return this.httpClient.post
    (loginUrl,data,{headers:headers,withCredentials:true}).pipe(
    map((response:any)=> response),
    catchError(e => {
      if(e.status === 401){
        return "Invalid Credintials";
      }else{
        return "Unknown Credintials";
      }
    }));    
  }

  // submitUserAccessDetails(loginUserData){
  //   const headers = new HttpHeaders().set("Content-Type","application/json");
  //   let data=JSON.stringify({
  //     UserName:loginUserData.userName,
  //     Password:loginUserData.password
  //   });
  //   var  loginUrl:string = "http://localhost:64341/api/"+"accesstoken"

  //   return this.httpClient.get
  //   (loginUrl,{headers:headers,withCredentials:true}).pipe(
  //   map((response:any)=> response),
  //   catchError(e => {
  //     if(e.status === 401){
  //       return "Invalid Credintials";
  //         //return observableThrowError(AuthenticationError.InvalidCredintials)
  //     }else{
  //       return "Unknown Credintials";
  //     }

  //   }));
    
  // }
}
