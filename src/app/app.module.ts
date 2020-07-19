import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './cts/public/publicrouting/public.module';
import { HomeModule } from './cts/home/homerouting/home.module';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SharedroutingModule } from './cts/shared/sharedrouting/sharedrouting.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingHttpInterceptor, LoadingHttpInterceptorFactoryProvider } from './core/loading-http-interceptor/loading-http-interceptor.component';


import { BranchesComponent } from './cts/home/components/branches/branches.component';
import { AddBranchComponent } from './cts/home/components/branches/add-branch/add-branch.component';
import { AuditlogsComponent } from './cts/home/components/auditlogs/auditlogs.component';
import { AddAuditlogComponent } from './cts/home/components/auditlogs/add-auditlog/add-auditlog.component';
import { AuthenticatedHttpInterceptorService } from './core/security/authenticated-http-interceptor.service';
import { LocalstoragetokenService } from './core/security/localstoragetoken.service';
import { SessionTimeoutService } from './core/security/session-timeout.service';
import { Router } from '@angular/router';

const SessionTimeoutServiceProvider={
  provide:SessionTimeoutService,
  useFactory:getSessionTimeoutService,
  multi:false,
  deps:[Router]
}

const LocalstoragetokenServiceProvider={
  provide:HTTP_INTERCEPTORS,
  useExisting:LocalstoragetokenService,
  multi:true
}

const LoadingHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: LoadingHttpInterceptor,
  multi: true
}
const AuthenticatedHttpInterceptorServiceProvider={
  provide:HTTP_INTERCEPTORS,
  useFactory:getAuthenticatedHttpInterceptor,
  deps:[Router,LocalstoragetokenService,SessionTimeoutService],
  multi:true
}
@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    SpinnerComponent,
    BranchesComponent,
    AddBranchComponent,
    AuditlogsComponent,
    AddAuditlogComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PublicModule,
    HomeModule,
    SharedroutingModule,
    AppRoutingModule

  ],
  providers: [
    SessionTimeoutServiceProvider,
    AuthenticatedHttpInterceptorServiceProvider,
    LoadingHttpInterceptorProvider,
    LoadingHttpInterceptorFactoryProvider,
    // LocalstoragetokenServiceProvider
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(router:Router){
  }
}

export function getSessionTimeoutService(router:Router){
  return new SessionTimeoutService(router)
}

export function getAuthenticatedHttpInterceptor(router:Router,tokenProvider:LocalstoragetokenService,sessionTimeoutService:SessionTimeoutService){
  return new AuthenticatedHttpInterceptorService(router,tokenProvider,sessionTimeoutService)
}
