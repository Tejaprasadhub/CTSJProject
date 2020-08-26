import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AUTHZ_SERVICE, AuthorizationServiceBase } from './authorization.service';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
@Injectable()
export class AuthorizationGuard  implements CanActivate, CanActivateChild,CanLoad {
    
    constructor(private router:Router,private httpClient:HttpClient,@Inject(AUTHZ_SERVICE) private authorizationService:AuthorizationServiceBase){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean> | boolean{
        
        return this.authorizationService.authorizeRouteAccess(state.url).pipe(
            map(result =>{
                if(result.status) return true;                
            })
        )
    }

    canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | boolean{
        return this.canActivate(route,state);
    }
    canLoad(route:Route):boolean{
        return false;
    }
}
