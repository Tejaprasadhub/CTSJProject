import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate,CanActivateChild,CanLoad {

  constructor(private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    let url:string = state.url
    return this.checkLogin(url);
  }

  canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    return this.canActivate(route,state);
  }

  canLoad(route:Route):boolean{
    let url=`/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url:string):boolean{
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;

    if(token != null && token != ""){
      //logged in so return true
      return true;
    }else{
      //not logged in so redirect to login page
      this.router.navigate(['/login']);      
      return false
    }
  }

}
